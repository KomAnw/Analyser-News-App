import '../../vendor/normalize.css';
import '../index/index.css';
import '../../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'


import { GhApi } from '../../js/modules/GhApi';
import { owner, repo, container, points } from '../../js/constants/constants.js';
import { CommitCard } from '../../js/components/CommitCard.js';
import { CommitCardList } from '../../js/components/CommitCardList.js'

const commits = new GhApi(owner, repo)
commits.getCommit()
    .then(data => createApiCard(data))

function createApiCard(data) {
    const arr = [];
    const dataLength = data.length
    data.forEach(item => {
        const commitData = {
            name: item.commit.committer.name,
            email: item.commit.committer.email,
            date: item.commit.committer.date,
            message: item.commit.message,
            img: item.author.avatar_url,
            url: item.html_url,
        }
        const card = new CommitCard(commitData);
        const cardsNode = card.create();
        arr.push(cardsNode);
    })
    addToList(arr, dataLength);
}

function addToList(arrCardsNode, dataLength) {
    const list = new CommitCardList(arrCardsNode, container, dataLength, points)
    list.render()
    list.addPoints()
    list.glide();
}