/**
 * feat:    New feature
 * fix:     Bug fix
 * docs:    Documentation update
 * style:   Code changes that do not affect the program logic (such as modifying whitespace, formatting, indentation, adding missing semicolons, etc., without changing the code logic)
 * refactor: Code refactoring
 * perf:    Performance improvement
 * test:    Related to tests
 * build:   Related to build process
 * ci:      Continuous integration
 * chore:   Other changes that do not fall into the above types, such as build process or dependency management
 * revert:  Revert code
 */
/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'perf', 'style', 'docs', 'test', 'refactor', 'build', 'ci', 'chore', 'revert', 'release'],
    ],
  },
  prompt: {
    messages: {
      type: 'Select the type of change you are committing:',
      scope: 'Select a scope (optional):',
      customScope: 'Enter a custom scope:',
      subject: 'Provide a short and descriptive commit message:\n',
      body: 'Provide a more detailed description of the change (optional). Use "|" for new lines:\n',
      breaking: 'List any breaking changes (optional). Use "|" for new lines:\n',
      footerPrefixsSelect: 'Select an issue prefix (optional):',
      customFooterPrefixs: 'Enter a custom issue prefix:',
      footer: 'List related issues (optional), e.g., #31, #I3244:\n',
      confirmCommit: 'Commit or modify the commit?',
    },
    types: [
      { value: 'feat', name: 'feat:     A new feature' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'docs', name: 'docs:     Documentation only changes' },
      { value: 'style', name: 'style:    Changes that do not affect the meaning of the code' },
      { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
      { value: 'perf', name: 'perf:     A code change that improves performance' },
      { value: 'test', name: 'test:     Adding missing tests or correcting existing tests' },
      {
        value: 'build',
        name: 'build:    Changes that affect the build system or external dependencies',
      },
      { value: 'ci', name: 'ci:       Changes to CI configuration files and scripts' },
      { value: 'revert', name: 'revert:   Revert to a commit' },
      { value: 'chore', name: 'chore:    Other changes that do not modify src or test files' },
    ],
    useEmoji: false,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
