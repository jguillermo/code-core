import { JsonCompare } from './json-commpare';
import { universalToString } from '../utils/string/universal-to-string';

function compareValues(data: any, reference: any, strict: boolean, errors: string[]): void {
  const jsonCompare = new JsonCompare(data, reference, strict);
  it(`compare strict[${strict}]: ${universalToString(data)} eq ${universalToString(reference)}`, () => {
    expect(errors).toEqual(jsonCompare.differences);
  });
}

function s(data: any, reference: any, errors: string[] = []) {
  compareValues(data, reference, true, errors);
}

function _(include: any, reference: any, errors: string[] = []) {
  compareValues(include, reference, false, errors);
}

describe('JsonCompare', () => {
  describe.only('primitives', () => {
    describe('strict ', () => {
      describe('correct', () => {
        s(1, 1);
        s(false, false);
        s('1', '1');
        s('text', 'text');
      });
      describe('error', () => {
        s(1, 2, ['2 -> 1']);
        s(false, true, ['true -> false']);
        s('1', '2', ['"2" -> "1"']);
        s('text', 'text2', ['"text2" -> "text"']);
      });
    });
    describe('include', () => {
      describe('correct', () => {
        _(1, 1);
        _(false, false);
        _('1', '1');
        _('text', 'text');
      });
      describe('error ', () => {
        _(1, 2, ['2 -> 1']);
        _(false, true, ['true -> false']);
        _('1', '2', ['"2" -> "1"']);
        _('text', 'text2', ['"text2" -> "text"']);
      });
    });
  });

  describe('Objects', () => {
    describe('strict ', () => {
      describe('correct', () => {
        s({ a: '1', b: 1 }, { a: '1', b: 1 });
        s({ a: 1, b: 1 }, { a: 1, b: 1 });
        s({ a: 1, b: 1 }, { a: 1, b: 1 });
        s({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 1 } });
      });
      describe('error', () => {
        s({ a: 1, b: 1 }, { a: 1, b: 2 }, ['b: 2 -> 1']);
        s({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 2 } }, ['c.cb: 2 -> 1']);
        s({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1 } }, ['c.cb: key not found']);

        s({ a: '1' }, { a: '1', b: 1 }, ['b: extra key found']);
        s({ a: 1 }, { a: 1, b: 1 }, ['b: extra key found']);

        s({ a: 1 }, { a: 1, b: 1 }, ['b: extra key found']); //key not found
        s({ a: 1, c: { cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 1 } }, ['c.ca: extra key found', 'b: extra key found']); //'c.ca: key not found', 'b: key not found'
      });
    });
    describe('include', () => {
      describe('correct', () => {
        _({ a: 1 }, { a: 1, b: 1 });
        _({ a: 1, c: { cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 1 } });
        _({ a: '1' }, { a: '1', b: 1 });
        _({ a: 1 }, { a: 1, b: 1 });
      });
      describe('error ', () => {
        _({ a: 1, b: 1 }, { a: 1, b: 2 }, ['b: 2 -> 1']);
        _({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 2 } }, ['c.cb: 2 -> 1']);
        _({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1 } }, ['c.cb: key not found']);
      });
    });
  });

  describe('array Objects', () => {
    describe('equals ', () => {
      s([1], [1]);
      s([1, 2], [1, 2]);
      s([1, '2'], [1, '2']);
      s([1, '2', true], [1, '2', true]);

      _([1], [1]);
      _([1], [1, 2]);
      _([1], [1, '2']);
      _([1, '2'], [1, '2', true]);

      _([{ a: 1, b: 1 }], [{ a: 1, b: 1 }]);
      _([{ a: 1, b: 1, c: { ca: 1, cb: 1 } }], [{ a: 1, b: 1, c: { ca: 1, cb: 1 } }]);
      _([{ a: 1, b: 1, c: [{ ca: 1, cb: 1 }] }], [{ a: 1, b: 1, c: [{ ca: 1, cb: 1 }] }]);
    });
    describe('not equals', () => {
      _([{ a: 1, b: 1 }], [{ a: 1, b: 2 }], ['[0].b: 2 -> 1']);
      _([{ a: 1, b: 1, c: { ca: 1, cb: 1 } }], [{ a: 1, b: 1, c: { ca: 1, cb: 2 } }], ['[0].c.cb: 2 -> 1']);
      _([{ a: 1, b: 1, c: [{ ca: 1, cb: 1 }] }], [{ a: 1, b: 1, c: [{ ca: 1, cb: 2 }] }], ['[0].c[0].cb: 2 -> 1']);
      _([{ a: 1, b: 1, c: { ca: 1, cb: 1 } }], [{ a: 1, b: 1, c: { ca: 1 } }], ['[0].c.cb: key not found']);
      _([{ a: 1, b: 1, c: [{ ca: 1, cb: 1 }] }], [{ a: 1, b: 1, c: [{ ca: 1 }] }], ['[0].c[0].cb: key not found']);

      s([1], [1, 2], [': length of [1] is not equal to length of [1,2]']);
      s([1], [1, '2'], [': length of [1] is not equal to length of [1,"2"]']);
      s([1, '2'], [1, '2', true], [': length of [1,"2"] is not equal to length of [1,"2",true]']);
    });
  });

  describe('values testing', () => {
    _(
      [
        {
          _id: 'UUID()',
          name: 'Name',
          description: 'Description',
          studentCount: 12,
          attemptType: 'test',
          attemptCount: 0,
          timeLimit: 20,
          teacher: {
            id: 'dc47ff49-90d0-4ae5-8c5d-7ff5ac8c5776',
            role: 'teacher',
            userName: 'teacher-demo',
            email: 'teacher-demo@mail.com',
            firstName: 'Teacher',
            lastName: 'Demo',
          },
          scene: {
            name: 'name',
            description: 'description',
            image: 'photo.png',
            scene: { a: 1, b: 1, c: { ca: 1, cb: 1 } },
          },
          author: 'dc47ff49-90d0-4ae5-8c5d-7ff5ac8c5776',
          tenant: '2504559e-6c28-4d78-8025-94f2714001c0',
        },
      ],
      [
        {
          _id: '42e05ee0-ace6-4565-b86a-ffdb0590341e',
          __v: 0,
          attemptCount: 0,
          attemptType: 'test',
          createAt: { $date: 1723531231695 },
          description: 'Description',
          endAt: { $date: 1672876800000 },
          name: 'Name',
          scene: {
            id: '4c8e015a-ae43-4c69-a349-badc7662fa29',
            name: 'name',
            description: 'description',
            image: 'photo.png',
            scene: { a: 1, b: 1, c: { ca: 1, cb: 1 } },
          },
          sceneId: '4c8e015a-ae43-4c69-a349-badc7662fa29',
          startAt: { $date: 1672531200000 },
          studentCount: 12,
          teacher: {
            id: 'dc47ff49-90d0-4ae5-8c5d-7ff5ac8c5776',
            role: 'teacher',
            userName: 'teacher-demo',
            email: 'teacher-demo@mail.com',
            firstName: 'Teacher',
            lastName: 'Demo',
            organizationId: '2504559e-6c28-4d78-8025-94f2714001c0',
          },
          timeLimit: 20,
          tutorialMode: false,
          author: 'dc47ff49-90d0-4ae5-8c5d-7ff5ac8c5776',
          tenant: '2504559e-6c28-4d78-8025-94f2714001c0',
        },
      ],
    );
  });
});
