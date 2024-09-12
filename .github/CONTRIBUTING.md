# Contributing

Synthetics uses GitHub to manage reviews of pull requests.

* If you are a new contributor see: [Steps to Contribute](#steps-to-contribute)

* If you have a trivial fix or improvement, go ahead and create a pull request,
  addressing (with `@...`) a suitable maintainer of this repository (see
  [MAINTAINERS.md](MAINTAINERS.md)) in the description of the pull request.

* Relevant coding style guidelines are the [Go Code Review
  Comments](https://code.google.com/p/go-wiki/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best
  Practices for Production
  Environments](https://peter.bourgon.org/go-in-production/#formatting-and-style).

* Be sure to sign off on the [DCO](https://github.com/probot/dco#how-it-works).

## Steps to Contribute

## 🚀 Getting Started

### 🔖 Prerequisites

**TypeScript**: `version >4.7.4`

### 📦 Installation

Build the project from source:

1. Clone the synthetics repository:
```sh
❯ git clone https://github.com/HealthCheckHQ/synthetics
```

2. Navigate to the project directory:
```sh
❯ cd synthetics
```

3. Install the required dependencies:
```sh
❯ npm install
```

### 🤖 Usage

To run the project, execute the following command:

#### During Development

```sh
❯ npm run build && node dist/main.js
```

#### Verify the final Prod run before raising PR

```sh
❯ npm run build && npm start
```

### 🧪 Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/HealthCheckHQ/synthetics/issues)**: Submit bugs found or log feature requests for the `synthetics` project.
- **[Submit Pull Requests](https://github.com/HealthCheckHQ/synthetics/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/HealthCheckHQ/synthetics/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/HealthCheckHQ/synthetics
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>


## Pull Request Checklist

* Branch from the main branch and, if needed, rebase to the current main branch before submitting your pull request. If it doesn't merge cleanly with main you may be asked to rebase your changes.

* Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment.

* Add tests relevant to the fixed bug or new feature.

## Dependency management

The Synethtics project uses [NPM Node modules](https://docs.npmjs.com/about-packages-and-modules) to manage dependencies on external packages.

To add or update a new dependency, use the `npm i` command:

```bash
# Pick the latest tagged release.
npm i pkg@latest

# Pick a specific version.
npm i pkg@vX.Y.Z
```
