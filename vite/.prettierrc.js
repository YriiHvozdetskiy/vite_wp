module.exports = {
   printWidth: 120,
   tabWidth: 3,
   useTabs: true,
   semi: true,
   singleQuote: true,
   quoteProps: 'as-needed',
   trailingComma: 'es5',
   bracketSpacing: true,
   bracketSameLine: false,
   arrowParens: 'always',
   rangeStart: 0,
   rangeEnd: Infinity,
   requirePragma: false,
   insertPragma: false,
   proseWrap: 'preserve',
   htmlWhitespaceSensitivity: 'css',
   endOfLine: 'lf',
   embeddedLanguageFormatting: 'auto',
   singleAttributePerLine: false,
   overrides: [
      {
         files: '*.html',
         options: {
            parser: 'html',
         },
      },
   ],
};