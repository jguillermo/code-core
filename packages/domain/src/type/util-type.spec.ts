import { ArrayType, IdType } from './index';

describe('ArrayType', () => {
  const id1 = new IdType(IdType.random());
  const id2 = new IdType(IdType.random());
  const id3 = new IdType(IdType.random());
  const id4 = new IdType(IdType.random());
  describe('ArrayType.hasValue', () => {
    it('should be true', () => {
      expect(ArrayType.hasValue([id1], id1)).toBe(true);
      expect(ArrayType.hasValue([id1, id2], id1)).toBe(true);
      expect(ArrayType.hasValue([id1, id2, id3], id1)).toBe(true);
      expect(ArrayType.hasValue([id1, id2, id3], id2)).toBe(true);
      expect(ArrayType.hasValue([id1, id2, id3], id3)).toBe(true);
    });
    it('should be false', () => {
      expect(ArrayType.hasValue([id1], id2)).toBe(false);
      expect(ArrayType.hasValue([id1, id2], id3)).toBe(false);
      expect(ArrayType.hasValue([id1, id2, id3], id4)).toBe(false);
    });
  });
  describe('ArrayType.addValue', () => {
    it('should add new item', () => {
      expect(ArrayType.addValue([], id1)).toEqual([id1]);
      expect(ArrayType.addValue([id1], id2)).toEqual([id1, id2]);
    });
    it('should not add  item', () => {
      expect(ArrayType.addValue([id1, id2], id2)).toEqual([id1, id2]);
    });
  });
  describe('Array.removeValue', () => {
    it('should remove new item', () => {
      expect(ArrayType.removeValue([id1], id1)).toEqual([]);
      expect(ArrayType.removeValue([id1, id2], id2)).toEqual([id1]);
      expect(ArrayType.removeValue([id2, id1], id2)).toEqual([id1]);

      expect(ArrayType.removeValue([id1, id2, id3], id1)).toEqual([id2, id3]);
      expect(ArrayType.removeValue([id1, id2, id3], id2)).toEqual([id1, id3]);
      expect(ArrayType.removeValue([id1, id2, id3], id3)).toEqual([id1, id2]);
    });
    it('should not remove item', () => {
      expect(ArrayType.removeValue([], id1)).toEqual([]);
      expect(ArrayType.removeValue([id1, id2], id3)).toEqual([id1, id2]);
    });
  });
});
