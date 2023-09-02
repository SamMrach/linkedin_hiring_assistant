import { fetchDomainByName, fetchCompanyDataByDomain } from '../Utils/Clearbit';

describe('test clearbit api', () => {
  it.skip('test fetchDomainByName function', async () => {
    const domain = await fetchDomainByName('paypal');
    // const data = await res.json();
    //console.log('data', domain);
    expect(domain).not.toBeNull();
  });

  it.skip('test fetchDomainByName function with unknown company', async () => {
    try {
      await fetchDomainByName('someUnkownCompany');
    } catch (e) {
      expect(e).toEqual('unknow company name');
    }
  });

  it.skip('test fetchCompanyDataByDomain function', async () => {
    const res = await fetchCompanyDataByDomain('paypal.com');
    console.log('data', res);
    expect(res).toBeDefined();
  });

  it('test fetchCompanyDataByDomain throw an error', async () => {
    try {
      await fetchCompanyDataByDomain('prpal.com');
    } catch (e) {
      expect(e).toEqual('error');
    }
  });
});
