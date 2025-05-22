const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('GITHUB_TOKEN');
        const issueId = core.getInput('issue-id');
        const comment = core.getInput('comment');

        const octokit = github.getOctokit(token);

        const context = github.context;
        const { owner, repo } = context.repo;

        const response = await octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            issue_number: issueId,
            body: comment
        });

        const commentId = response.data.id;
        
        core.setOutput('comment-id', commentId);

        console.log('Comentário adicionado com sucesso! ID do comentário:', commentId)
    } catch (error) {
        core.setFailed(`Erro ao adicionar comentário: ${error.message}`);
    }
}