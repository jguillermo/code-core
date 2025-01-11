import { SignPayload } from '../../domain/user/services/sign/sign-payload';
import { UserId } from '../../domain/user/types/userId';
import { UserRoles } from '../../domain/user/types/userPermissions';
import { UserName } from '../../domain/user/types/userName';
import { JWTDataSigner } from './jwt-data-signer';

describe('JWTDataSigner', () => {
  const secretKey = 'supersecretkeysupersecretkey';
  const payload = new SignPayload(new UserId('39fb8463-8c29-4434-a5d6-07b964b36ad9'), new UserRoles(['user']), new UserName('Alice'));

  let signer: JWTDataSigner;

  beforeEach(() => {
    signer = new JWTDataSigner(secretKey);
  });

  it('debería firmar los datos correctamente', () => {
    const signedToken = signer.sign(payload);
    expect(typeof signedToken).toEqual('string');
  });

  it('debería verificar y devolver los datos correctamente', () => {
    const signedToken = signer.sign(payload);
    const verifiedPayload = signer.verify(signedToken);
    expect(verifiedPayload).toBeInstanceOf(SignPayload);
    expect(verifiedPayload?.toJson()).toEqual(payload.toJson());
  });

  it('verify Error: invalid signature', () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZmI4NDYzLThjMjktNDQzNC1hNWQ2LTA3Yjk2NGIzNmFkOSIsInJvbGVzIjpbInVzZXIiXSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzM2NTkwOTQ5fQ.sqVH29NXG3LaxwIDfaVg8HwcajjA7PbDW9AkOaEykb0';

    expect(() => signer.verify(invalidToken)).toThrow('verify Error: invalid signature');
  });

  it('debería decodificar y devolver los datos correctamente', () => {
    const signedToken = signer.sign(payload);
    const decodedPayload = signer.data(signedToken);
    expect(decodedPayload).toEqual(payload.toJson());
  });

  it('read data data without secret', () => {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZmI4NDYzLThjMjktNDQzNC1hNWQ2LTA3Yjk2NGIzNmFkOSIsInJvbGVzIjpbInVzZXIiXSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzM2NTkwOTQ5fQ.sqVH29NXG3LaxwIDfaVg8HwcajjA7PbDW9AkOaEykb0';

    const result = signer.data(expiredToken);

    expect(result).toEqual({
      id: '39fb8463-8c29-4434-a5d6-07b964b36ad9',
      name: 'Alice',
      roles: ['user'],
    });
  });
});
