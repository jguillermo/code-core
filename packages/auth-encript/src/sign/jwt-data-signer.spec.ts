import { JWTDataSigner } from './jwt-data-signer';
import { SignPayload } from '@bounded-context/authentication-authorization';

describe('JWTDataSigner', () => {
  const secretKey = 'supersecretkeysupersecretkey';
  const rawPayload = {
    id: '39fb8463-8c29-4434-a5d6-07b964b36ad9',
    name: 'Alice',
    roles: ['user'],
  };
  const payload = SignPayload.create(rawPayload);

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
    expect(verifiedPayload?.toJson()).toEqual(rawPayload);
  });

  it('verify Error: invalid signature', () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZmI4NDYzLThjMjktNDQzNC1hNWQ2LTA3Yjk2NGIzNmFkOSIsInJvbGVzIjpbInVzZXIiXSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzM2NTkwOTQ5fQ.sqVH29NXG3LaxwIDfaVg8HwcajjA7PbDW9AkOaEykb0';

    expect(() => signer.verify(invalidToken)).toThrow('verify Error: invalid signature');
  });

  it('verify Error: invalid signature', () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsIajjA7PbDW9AkOaEykb0';

    expect(() => signer.verify(invalidToken)).toThrow('verify Error: jwt malformed');
  });

  it('debería decodificar y devolver los datos correctamente', () => {
    const signedToken = signer.sign(payload);
    const decodedPayload = signer.data(signedToken);
    expect(decodedPayload).toEqual(rawPayload);
  });

  it('read data data without secret', () => {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ZmI4NDYzLThjMjktNDQzNC1hNWQ2LTA3Yjk2NGIzNmFkOSIsInJvbGVzIjpbInVzZXIiXSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzM2NTkwOTQ5fQ.sqVH29NXG3LaxwIDfaVg8HwcajjA7PbDW9AkOaEykb0';
    const result = signer.data(expiredToken);
    expect(result).toEqual(rawPayload);
  });

  it('verify Error: invalid token', () => {
    const invalidToken = 'eyJhbGciOiJIUzI1ajjA7PbDW9AkOaEykb0';
    expect(() => signer.data(invalidToken)).toThrow('data Error: Validation Error');
  });
});
