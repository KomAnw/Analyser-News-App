export class GhApi {
    constructor(owner, repo) {
        this.owner = owner;
        this.repo = repo;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    async getCommit() {
        const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/commits`)
        const commit = await response.json();
        return commit;
    }
}