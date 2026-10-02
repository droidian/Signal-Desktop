// Copyright 2019 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assert } from 'chai';

import {
  findLinks,
  isLinkSneaky,
  isValidLink,
  shouldLinkifyMessage,
  shouldPreviewHref,
} from '../../types/LinkPreview.std.ts';

describe('Link previews', () => {
  describe('#isValidLink', () => {
    it('returns false for random, non-https URLs', () => {
      assert.isFalse(isValidLink(''));
      assert.isFalse(isValidLink('signal.com'));
      assert.isFalse(isValidLink('signal.org'));
      assert.isFalse(isValidLink('https'));
      assert.isFalse(isValidLink('https://'));
      assert.isFalse(isValidLink('https://bad url'));
      assert.isFalse(isValidLink('http://signal.org'));
    });

    it('returns true for https:// URLs', () => {
      assert.isTrue(isValidLink('https://signal.org'));
      assert.isTrue(isValidLink('https://somewhere.someplace.signal.org/'));
      assert.isTrue(isValidLink('https://signal.org/something/another/#thing'));
      assert.isTrue(
        isValidLink(
          'https://signal.org/something/another/?one=two&three=four#thing'
        )
      );
    });
  });

  describe('#shouldPreviewHref', () => {
    it('returns false for invalid URLs', () => {
      assert.isFalse(shouldPreviewHref(''));
      assert.isFalse(shouldPreviewHref('https'));
      assert.isFalse(shouldPreviewHref('https://'));
      assert.isFalse(shouldPreviewHref('https://bad url'));
      assert.isFalse(shouldPreviewHref('signal.com'));
      assert.isFalse(shouldPreviewHref('signal.org'));
    });

    it('returns false for non-HTTPS URLs', () => {
      assert.isFalse(shouldPreviewHref('http://signal.org'));
      assert.isFalse(shouldPreviewHref('ftp://signal.org'));
      assert.isFalse(shouldPreviewHref('file://signal'));
    });

    it('returns false if the link is "sneaky"', () => {
      // See `isLinkSneaky` tests below for more thorough checking.
      assert.isFalse(shouldPreviewHref('https://user:pass@signal.org'));
      assert.isFalse(shouldPreviewHref('https://aquí.signal'));
      assert.isFalse(shouldPreviewHref('https://aqu%C3%AD.signal'));
    });

    it('returns false for skipped domains', () => {
      assert.isFalse(shouldPreviewHref('https://debuglogs.org'));
      assert.isFalse(shouldPreviewHref('https://example.com'));
      assert.isFalse(shouldPreviewHref('https://new.example'));
      assert.isFalse(shouldPreviewHref('https://onion'));
      assert.isFalse(shouldPreviewHref('https://bloomin.onion'));
      assert.isFalse(shouldPreviewHref('https://localhost'));
      assert.isFalse(shouldPreviewHref('https://localhost:8080'));
      assert.isFalse(shouldPreviewHref('https://abcd.test'));
    });

    it('returns true for "safe" urls', () => {
      assert.isTrue(shouldPreviewHref('https://signal.org'));
      assert.isTrue(shouldPreviewHref('https://example.signal.org'));
      assert.isTrue(shouldPreviewHref('https://myexample.com'));
      assert.isTrue(
        shouldPreviewHref('https://signal.org/foo/bar?query=string#hash')
      );
    });
  });

  describe('#shouldLinkifyMessage;', () => {
    it('returns false for strings with directional override characters', () => {
      assert.isFalse(shouldLinkifyMessage('\u202c'));
      assert.isFalse(shouldLinkifyMessage('\u202d'));
      assert.isFalse(shouldLinkifyMessage('\u202e'));
    });

    it('returns true other strings', () => {
      assert.isTrue(shouldLinkifyMessage(null));
      assert.isTrue(shouldLinkifyMessage(undefined));
      assert.isTrue(shouldLinkifyMessage('Random other string aqu%C3%AD'));
    });
  });

  describe('#findLinks', () => {
    it('returns all links if no caretLocation is provided', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';

      const expected = [
        'https://github.com/signalapp/Signal-Desktop',
        'https://github.com/signalapp/Signal-Android',
      ];

      const actual = findLinks(text);
      assert.deepEqual(expected, actual);
    });

    it('returns all links after emojis without spaces in between', () => {
      const text = '😎https://github.com/signalapp/Signal-Desktop😛';

      const expected = ['https://github.com/signalapp/Signal-Desktop'];

      const actual = findLinks(text);
      assert.deepEqual(expected, actual);
    });

    it('returns all links after emojis with spaces in between, if a caretLocation is provided', () => {
      const text = '😎 https://github.com/signalapp/Signal-Desktop';

      const expected = ['https://github.com/signalapp/Signal-Desktop'];

      const actual = findLinks(text, 46);
      assert.deepEqual(expected, actual);
    });

    it('returns all links after a complex emoji, if a caretLocation is provided', () => {
      const text = '👨‍👩‍👦 https://github.com/signalapp/Signal-Desktop';

      const expected = ['https://github.com/signalapp/Signal-Desktop'];

      const actual = findLinks(text, 52);
      assert.deepEqual(expected, actual);
    });

    it('includes all links if cursor is not in a link', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';
      const caretLocation = 10;

      const expected = [
        'https://github.com/signalapp/Signal-Desktop',
        'https://github.com/signalapp/Signal-Android',
      ];

      const actual = findLinks(text, caretLocation);
      assert.deepEqual(expected, actual);
    });

    it('excludes a link not at the end if the caret is inside of it', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';
      const caretLocation = 30;

      const expected = ['https://github.com/signalapp/Signal-Android'];

      const actual = findLinks(text, caretLocation);
      assert.deepEqual(expected, actual);
    });

    it('excludes a link not at the end if the caret is at its end', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';
      const caretLocation = 64;

      const expected = ['https://github.com/signalapp/Signal-Android'];

      const actual = findLinks(text, caretLocation);
      assert.deepEqual(expected, actual);
    });

    it('excludes a link at the end of the caret is inside of it', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';
      const caretLocation = 100;

      const expected = ['https://github.com/signalapp/Signal-Desktop'];

      const actual = findLinks(text, caretLocation);
      assert.deepEqual(expected, actual);
    });

    it('includes link at the end if cursor is at its end', () => {
      const text =
        'Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android';
      const caretLocation = text.length;

      const expected = [
        'https://github.com/signalapp/Signal-Desktop',
        'https://github.com/signalapp/Signal-Android',
      ];

      const actual = findLinks(text, caretLocation);
      assert.deepEqual(expected, actual);
    });
  });

  describe('#isLinkSneaky', () => {
    it('returns "yes" for =', () => {
      const link = 'r.id=s.id';
      assert.strictEqual(isLinkSneaky(link), 'yes');
    });

    it('returns "yes" for strings with unicode drawing characters', () => {
      assert.strictEqual(
        isLinkSneaky('https://example.com/\u2500/stuff'),
        'yes'
      );
      assert.strictEqual(
        isLinkSneaky('https://example.com/\u2588/stuff'),
        'yes'
      );
      assert.strictEqual(
        isLinkSneaky('https://example.com/\u25FF/stuff'),
        'yes'
      );
    });

    it('returns "yes" for $', () => {
      const link = 'r.id$s.id';
      assert.strictEqual(isLinkSneaky(link), 'yes');
    });

    it('returns "yes" for +', () => {
      const link = 'r.id+s.id';
      assert.strictEqual(isLinkSneaky(link), 'yes');
    });

    it('returns "yes" for ^', () => {
      const link = 'r.id^s.id';
      assert.strictEqual(isLinkSneaky(link), 'yes');
    });

    it('returns "yes" for URLs with a length of 4097 or higher', () => {
      const href = `https://example.com/${'a'.repeat(4077)}`;
      assert.lengthOf(href, 4097, 'Test href is not the proper length');

      assert.strictEqual(isLinkSneaky(href), 'yes');
      assert.strictEqual(isLinkSneaky(`${href}?foo=bar`), 'yes');
    });

    describe('auth', () => {
      it('returns "yes" for hrefs with auth (or pretend auth)', () => {
        assert.strictEqual(
          isLinkSneaky('https://user:pass@example.com'),
          'yes'
        );
        assert.strictEqual(isLinkSneaky('https://user:@example.com'), 'yes');
        assert.strictEqual(isLinkSneaky('https://:pass@example.com'), 'yes');
        assert.strictEqual(
          isLinkSneaky('http://whatever.com&login=someuser@77777777'),
          'yes'
        );
      });
    });

    describe('domain', () => {
      it('returns false for all-latin domain', () => {
        const link = 'https://www.amazon.com';
        const actual = isLinkSneaky(link);
        assert.strictEqual(actual, false);
      });

      it('returns false for IPv4 addresses', () => {
        assert.isFalse(isLinkSneaky('https://127.0.0.1/path'));
      });

      // It's possible that this should return `false` but we'd need to add special logic
      //   for it.
      it('returns "yes" for IPv6 addresses', () => {
        assert.strictEqual(
          isLinkSneaky(
            'https://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/path'
          ),
          'yes'
        );
        assert.strictEqual(isLinkSneaky('https://[::]/path'), 'yes');
      });

      it('returns "yes" for Latin + Cyrillic domain', () => {
        const link = 'https://www.aмazon.com';
        const actual = isLinkSneaky(link);
        assert.strictEqual(actual, 'yes');
      });

      it('returns "yes" for Latin + Greek domain', () => {
        const link = 'https://www.αpple.com';
        const actual = isLinkSneaky(link);
        assert.strictEqual(actual, 'yes');
      });

      it('returns "yes" for ASCII and non-ASCII mix', () => {
        const link = 'https://www.аррӏе.com';
        const actual = isLinkSneaky(link);
        assert.strictEqual(actual, 'yes');
      });

      it('returns "yes" for Latin + High Greek domain', () => {
        const link = `https://www.apple${String.fromCodePoint(0x101a0)}.com`;
        const actual = isLinkSneaky(link);
        assert.strictEqual(actual, 'yes');
      });

      it("returns 'yes' if the domain doesn't contain a .", () => {
        assert.strictEqual(isLinkSneaky('https://example'), 'yes');
        assert.strictEqual(isLinkSneaky('https://localhost'), 'yes');
        assert.strictEqual(isLinkSneaky('https://localhost:3000'), 'yes');
      });

      it('returns "yes" if the domain has any empty labels', () => {
        assert.strictEqual(isLinkSneaky('https://example.'), 'yes');
        assert.strictEqual(isLinkSneaky('https://example.com.'), 'yes');
        assert.strictEqual(isLinkSneaky('https://.example.com'), 'yes');
        assert.strictEqual(isLinkSneaky('https://..example.com'), 'yes');
      });

      it('returns "yes" if the domain is longer than 2048 UTF-16 code points', () => {
        const domain = `${'a'.repeat(2041)}.example`;
        assert.lengthOf(domain, 2049, 'Test domain is the incorrect length');
        const link = `https://${domain}/foo/bar`;
        assert.strictEqual(isLinkSneaky(link), 'yes');
      });
    });

    describe('pathname', () => {
      it('returns false for no pathname', () => {
        assert.isFalse(isLinkSneaky('https://example.com'));
        assert.isFalse(isLinkSneaky('https://example.com/'));
      });

      it('returns false if the pathname contains valid characters', () => {
        assert.isFalse(isLinkSneaky('https://example.com/foo'));
        assert.isFalse(isLinkSneaky('https://example.com/foo/bar'));
        assert.isFalse(
          isLinkSneaky("https://example.com/:/[]@!$&'()*+,;=abc123-._~%")
        );
        assert.isFalse(
          isLinkSneaky(
            'https://lbry.tv/@ScammerRevolts:b0/DELETING-EVERY-FILE-OFF-A-SCAMMERS-LAPTOP-Destroyed:1'
          )
        );
      });

      it('returns "maybe" if the pathname contains invalid characters', () => {
        assert.strictEqual(
          isLinkSneaky('https://example.com/hello world'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/aquí-está'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/hello\x00world'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/hello\nworld'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/hello😈world'),
          'maybe'
        );
      });
    });

    describe('query string', () => {
      it('returns false for no query', () => {
        assert.isFalse(isLinkSneaky('https://example.com/foo'));
        assert.isFalse(isLinkSneaky('https://example.com/foo?'));
      });

      it('returns false if the query string contains valid characters', () => {
        assert.isFalse(isLinkSneaky('https://example.com/foo?bar'));
        assert.isFalse(isLinkSneaky('https://example.com/foo?bar=baz'));
        assert.isFalse(
          isLinkSneaky(
            "https://example.com/foo?bar=:/[]@!$&'()*+,;=abc123-._~%"
          )
        );
        assert.isFalse(
          isLinkSneaky(
            "https://example.com/foo?:/[]@!$&'()*+,;=abc123-._~%=baz"
          )
        );
      });

      it('returns "maybe" if the query string contains invalid characters', () => {
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?bar baz'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?bar baz=qux'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?bar=baz qux'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?aquí=está'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?hello=\x00world'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?hello=hello\nworld'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo?hello=😈world'),
          'maybe'
        );
      });
    });

    describe('hash', () => {
      it('returns false for no hash', () => {
        assert.isFalse(isLinkSneaky('https://example.com/foo'));
        assert.isFalse(isLinkSneaky('https://example.com/foo#'));
      });

      it('returns false if the hash contains valid characters', () => {
        assert.isFalse(isLinkSneaky('https://example.com/foo#bar'));
        assert.isFalse(
          isLinkSneaky("https://example.com/foo#:/[]@!$&'()*+,;=abc123-._~%")
        );
      });

      it('returns "maybe" if the hash contains invalid characters', () => {
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#bar baz'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#bar baz=qux'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#bar=baz qux'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#aquí_está'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#hello\x00world'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#hello\nworld'),
          'maybe'
        );
        assert.strictEqual(
          isLinkSneaky('https://example.com/foo#hello😈world'),
          'maybe'
        );
      });
    });
  });
});
