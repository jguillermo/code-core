import { JsonCompare } from './json-commpare';
import { universalToString } from '../utils/string/universal-to-string';

function _(obj1: any, obj2: any, expectValues: string[] = []) {
  const jsonCompare = new JsonCompare(obj1, obj2, false);
  it(`compare: ${universalToString(obj1)} eq ${universalToString(obj2)}`, () => {
    expect(expectValues).toEqual(jsonCompare.differences);
  });
}

describe('JsonCompare', () => {
  describe('primitives', () => {
    describe('equals ', () => {
      _(1, 1);
      _(false, false);
      _('1', '1');
      _('text', 'text');
      _({ a: '1', b: 1 }, { a: '1', b: 1 });
      _({ a: 1, b: 1 }, { a: 1, b: 1 });
      _([1], [1]);
      _([1, 2], [1, 2]);
      _([1, '2'], [1, '2']);
      _([1, '2', true], [1, '2', true]);
    });
    describe('not equals ', () => {
      _(1, 2, [': 2 -> 1']);
      _('text', 'text2', [': "text2" -> "text"']);
    });
  });

  describe('Objects', () => {
    describe('equals ', () => {
      _({ a: 1, b: 1 }, { a: 1, b: 1 });
      _({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 1 } });
    });
    describe('not equals ', () => {
      _({ a: 1, b: 1 }, { a: 1, b: 2 }, ['b: 2 -> 1']);
      _({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1, cb: 2 } }, ['c.cb: 2 -> 1']);
      _({ a: 1, b: 1, c: { ca: 1, cb: 1 } }, { a: 1, b: 1, c: { ca: 1 } }, ['c.cb: key not found']);
    });
  });

  describe('array Objects', () => {
    describe('equals ', () => {
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
