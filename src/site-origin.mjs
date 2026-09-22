// Existing verified Vercel configuration: apex permanently redirects to www.
// Keep custom development/test origins configurable; never trust arbitrary hosts.
export function canonicalOrigin(value='https://www.felexiaconseils.com'){
  const url=new URL(value);
  if(!['https:','http:'].includes(url.protocol))throw new Error('SITE_URL must be an HTTP(S) origin');
  if(url.origin==='https://felexiaconseils.com')url.hostname='www.felexiaconseils.com';
  return url.origin;
}
