// Known disposable / temporary email domains, blocked at signup so throwaway
// inboxes can't farm accounts. This is a curated core set of the most common
// providers (and their many rotating aliases), not an exhaustive list — it stops
// the lazy 99% without a big data dependency. Add domains as abuse shows up.
//
// Matching is done on the full lower-cased domain (see isDisposableEmail), so
// entries here must be bare registrable domains, one per line.
const DISPOSABLE_DOMAINS: ReadonlySet<string> = new Set([
  // 10 Minute Mail family
  "10minutemail.com", "10minutemail.net", "10minutemail.org", "10minmail.com",
  "10minutemail.com", "10minutesmail.com", "10minutemail.co.uk", "10minutmail.com",
  // Mailinator family
  "mailinator.com", "mailinator.net", "mailinator.org", "mailinator2.com",
  "mailinator.gq", "mailinater.com", "reallymymail.com", "sogetthis.com",
  "spamherelots.com", "thisisnotmyrealemail.com", "binkmail.com", "bobmail.info",
  "chammy.info", "devnullmail.com", "letthemeatspam.com", "mailin8r.com",
  "notmailinator.com", "spam.la", "suremail.info", "tradermail.info",
  // Guerrilla Mail family
  "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "guerrillamail.biz",
  "guerrillamail.de", "guerrillamail.info", "guerrillamailblock.com", "grr.la",
  "sharklasers.com", "spam4.me", "pokemail.net", "guerillamail.com", "guerillamail.net",
  // Temp-Mail family
  "temp-mail.org", "temp-mail.com", "temp-mail.io", "temp-mail.ru", "tempmail.com",
  "tempmail.net", "tempmail.io", "tempmailo.com", "tempmail.dev", "tempmailaddress.com",
  "tempmail.plus", "tempail.com", "tempinbox.com", "tempimbox.com", "tmail.com",
  "tmailor.com", "tmpmail.org", "tmpmail.net", "tmpeml.com", "tmpbox.net",
  // YOPmail
  "yopmail.com", "yopmail.net", "yopmail.fr", "cool.fr.nf", "jetable.fr.nf",
  "nospam.ze.tc", "nomail.xl.cx", "mega.zik.dj", "speed.1s.fr", "courriel.fr.nf",
  "moncourrier.fr.nf", "monemail.fr.nf", "monmail.fr.nf",
  // Getnada / Nada
  "getnada.com", "nada.email", "getairmail.com",
  // Maildrop / Mailnesia / etc
  "maildrop.cc", "mailnesia.com", "mailcatch.com", "mailmetrash.com", "trashmail.com",
  "trashmail.net", "trashmail.org", "trashmail.me", "trashmail.io", "trashmailer.com",
  "kurzepost.de", "objectmail.com", "proxymail.eu", "rcpt.at", "trash-mail.at",
  "trash-mail.com", "trash-mail.de", "wegwerfmail.de", "wegwerfmail.net", "wegwerfmail.org",
  // Dispostable / Fakemail / etc
  "dispostable.com", "fakemail.net", "fakemailgenerator.com", "fakeinbox.com",
  "fake-mail.ml", "fakemailz.com", "emailfake.com", "email-fake.com", "fakermail.com",
  // Throwaway / Discard / etc
  "throwawaymail.com", "throwam.com", "discard.email", "discardmail.com",
  "discardmail.de", "spambog.com", "spambog.de", "spambog.ru", "spam.su",
  "0-mail.com", "0clickemail.com", "20mail.it", "20minutemail.com", "20email.eu",
  // Mytemp / Moakt / etc
  "mytemp.email", "moakt.com", "moakt.cc", "moakt.ws", "tijdelijkemail.nl",
  "tijdelijke-email.nl", "cs.email", "1secmail.com", "1secmail.net", "1secmail.org",
  "esiix.com", "wwjmp.com", "xojxe.com", "yoggm.com", "dpptd.com",
  // Mohmal / Emailondeck / etc
  "mohmal.com", "mohmal.in", "mohmal.tech", "emailondeck.com", "emailtemporario.com.br",
  "emailtemp.org", "emltmp.com", "emlpro.com", "emlhub.com",
  // Inboxbear / Mailpoof / etc
  "inboxbear.com", "mailpoof.com", "mailbox.in.ua", "mailboxy.fun", "mailto.plus",
  "fexpost.com", "fexbox.org", "fexbox.ru", "rover.info", "chitthi.in",
  "vomoto.com", "dcctb.com", "knol-power.nl", "hotmail.buzz", "vjuum.com",
  // Getonemail / Harakirimail / etc
  "harakirimail.com", "mvrht.net", "maileater.com", "mailexpire.com", "mailforspam.com",
  "mailfreeonline.com", "mailhz.me", "mailimate.com", "mailquack.com", "mailscrap.com",
  "mailshell.com", "mailsucker.net", "mailtemp.info", "mailtothis.com", "mailzilla.com",
  "mailzilla.org", "sneakemail.com", "spamavert.com", "spambox.us", "spamcannon.com",
  "spamcannon.net", "spamcon.org", "spamcorptastic.com", "spamday.com", "spamfree24.com",
  "spamfree24.de", "spamfree24.eu", "spamfree24.info", "spamfree24.net", "spamfree24.org",
  "spamgourmet.com", "spamgourmet.net", "spamgourmet.org", "spamhole.com", "spaminator.de",
  "spamkill.info", "spaml.com", "spaml.de", "spammotel.com", "spamobox.com",
  "spamslicer.com", "spamspot.com", "spamthis.co.uk", "spamtrail.com", "spamthisplease.com",
  // Trbvm / Byom / etc
  "trbvm.com", "trbvn.com", "byom.de", "mailnull.com", "mytrashmail.com",
  "nowmymail.com", "onewaymail.com", "pjjkp.com", "put2.net", "quickinbox.com",
  "rppkn.com", "s0ny.net", "safe-mail.net", "safetymail.info", "safetypost.de",
  "selfdestructingmail.com", "sendspamhere.com", "shieldedmail.com", "shieldemail.com",
  "shitmail.me", "shitmail.org", "shitware.nl", "slaskpost.se", "slopsbox.com",
  "smellfear.com", "snakemail.com", "sofimail.com", "sofort-mail.de", "solvemail.info",
  // Yamail / Yeah / etc misc
  "tempemail.co", "tempe-mail.com", "tempemail.com", "tempemail.net", "tempsky.com",
  "temporarily.de", "temporarioemail.com.br", "temporaryemail.net", "temporaryemail.us",
  "temporaryforwarding.com", "temporaryinbox.com", "tempthe.net", "thankyou2010.com",
  "thisisnotmyrealemail.info", "throwawayemailaddress.com", "tilien.com", "tmailinator.com",
  "toiea.com", "trialmail.de", "veryrealemail.com", "webemail.me", "wh4f.org",
  "whyspam.me", "willselfdestruct.com", "wuzup.net", "wuzupmail.net", "yentzscr.com",
  "yuurok.com", "zoemail.com", "zoemail.net", "zoemail.org", "zippymail.info",
  // Cloud/burner misc that recur in abuse lists
  "burnermail.io", "burnersms.com", "anonymbox.com", "armyspy.com", "cuvox.de",
  "dayrep.com", "einrot.com", "fleckens.hu", "gustr.com", "jourrapide.com",
  "rhyta.com", "superrito.com", "teleworm.us", "mail-temp.com", "mail-temporaire.fr",
  "mailtemporaire.com", "mailtemporaire.fr", "yy.com.tw", "linshiyouxiang.net",
  "mintemail.com", "mailnator.com", "spam4.me", "instant-mail.de", "byebyemail.com",
  "1zhuan.com", "muellmail.com", "muell.icu", "muell.io", "muell.email",
  "emailna.co", "emailna.life", "clrmail.com", "crazymailing.com", "dropmail.me",
  "10mail.org", "10mail.com", "33mail.com", "vintomaper.com", "smtp99.com",
]);

/** Extract the lower-cased domain part of an email address, or "" if malformed. */
function domainOf(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 0) return "";
  return email
    .slice(at + 1)
    .trim()
    .toLowerCase();
}

/** True when the email uses a known disposable / temp-mail domain. */
export function isDisposableEmail(email: string): boolean {
  const domain = domainOf(email);
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

export { DISPOSABLE_DOMAINS };
