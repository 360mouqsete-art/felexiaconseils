const boolean = (value, fallback = false) => value === undefined || value === '' ? fallback : value === 'true' || value === '1';
const number = (value, fallback, min, max) => {
  const result = value === undefined || value === '' ? fallback : Number(value);
  if (!Number.isFinite(result) || result < min || result > max) throw new Error('Invalid intelligence configuration');
  return result;
};
export function intelligenceConfig(env = process.env) {
  const timezone = env.FELEXIA_TIMEZONE || 'Africa/Casablanca';
  new Intl.DateTimeFormat('en-GB', {timeZone:timezone}).format();
  const publicationHour = env.FELEXIA_PUBLICATION_HOUR || '09:00';
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(publicationHour)) throw new Error('Invalid publication hour');
  return {
    enabled:boolean(env.FELEXIA_INTELLIGENCE_ENABLED), autoPublish:boolean(env.FELEXIA_AUTO_PUBLISH),
    dryRun:boolean(env.FELEXIA_DRY_RUN,true), allowPaidApis:boolean(env.FELEXIA_ALLOW_PAID_APIS),
    requireLegalReview:boolean(env.FELEXIA_REQUIRE_LEGAL_REVIEW), timezone, publicationHour,
    dailyBudget:number(env.FELEXIA_DAILY_API_BUDGET,0,0,10000), monthlyBudget:number(env.FELEXIA_MONTHLY_API_BUDGET,0,0,100000),
    reserveTarget:number(env.FELEXIA_RESERVE_TARGET,14,1,100), backfillPerDay:number(env.FELEXIA_BACKFILL_PER_DAY,2,0,10),
    maxSourceAgeDays:number(env.FELEXIA_SOURCE_MAX_AGE_DAYS,30,1,365), minWords:number(env.FELEXIA_MIN_ARTICLE_WORDS,350,100,3000),
    researchProvider:env.FELEXIA_RESEARCH_PROVIDER || 'institutional', llmProvider:env.FELEXIA_LLM_PROVIDER || 'gateway',
    imageProvider:env.FELEXIA_IMAGE_PROVIDER || 'gateway', origin:env.SITE_URL || 'https://www.felexiaconseils.com'
  };
}
export function localClock(now = new Date(), timezone = 'Africa/Casablanca') {
  const values = Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:timezone,calendar:'gregory',numberingSystem:'latn',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
  return {day:`${values.year}-${values.month}-${values.day}`, month:`${values.year}-${values.month}`, time:`${values.hour}:${values.minute}`};
}
export function clockDiagnostics(now = new Date(), timezone = 'Africa/Casablanca') {
  const clock=localClock(now,timezone);
  return {currentTimeUTC:now.toISOString(),day:clock.day,localTime:clock.time,timezone,runtime:{node:process.versions.node,icu:process.versions.icu||null,tz:process.versions.tz||null}};
}
export const languages = ['fr','ar','en'];
