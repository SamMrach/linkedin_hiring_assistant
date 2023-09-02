import { CompanyProfile } from 'src/models/Experience';

// @ts-nocheck
export async function fetchCompanyData(companyName) {
  let DOMAIN = '';
  try {
    DOMAIN = await fetchDomainByName(companyName);
  } catch (e) {
    return Promise.reject(e);
  }
  let data = await fetchCompanyDataByDomain(DOMAIN);
  return data;
}

export async function fetchCompanyDataByDomain(DOMAIN) {
  const API_KEY = 'sk_6e39d6ee2a598061f11e93866c1093b2';
  const url = `https://company.clearbit.com/v2/companies/find?domain=${DOMAIN}`;
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
  };
  try {
    let res = await fetch(url, { headers });
    let data = await res.json();
    return data;
  } catch (e) {
    throw 'error';
  }
}

export async function fetchDomainByName(companyName: string) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer sk_6e39d6ee2a598061f11e93866c1093b2');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    let res = await fetch(`https://company.clearbit.com/v1/domains/find?name=${companyName}`, requestOptions);
    let data = await res.json();
    if (data.error) throw new Error();
    return data.domain;
  } catch (e) {
    throw 'unknow company name';
  }
}

export async function fetchCompaniesData(companiesName) {
  console.log(companiesName);
  const requests = companiesName.map(company => fetchCompanyData(company)).map(req => req.catch(e => e));

  const result = await Promise.allSettled(requests);
  //console.log(result.filter(promise=>!(promise.value instanceof Error)));
  return result.filter(promise => !(promise.value instanceof Error)).map(res => res.value);
}
