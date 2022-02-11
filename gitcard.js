const link = document.querySelector('.avatar')
const img = document.querySelector('.avatar img')
const nome = document.querySelector('.content h1')
const total_repo = document.querySelectorAll('.status li a strong')[0]
const total_gists = document.querySelectorAll('.status li a strong')[1]
const total_seg = document.querySelectorAll('.status li a strong')[2]
const link_total_repo = document.querySelectorAll('.status li a')[0]
const link_total_gists = document.querySelectorAll('.status li a')[1]
const link_total_seg = document.querySelectorAll('.status li a')[2]

const form = document.querySelector('.js-form')
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.usuario-github');
    
    const text = input.value.trim();
    if(text !== ''){
        getGitHubInfo(text)
        input.value = '';
        input.focus();
    }
});
const getGitHubInfo = function (username) {
    let url = 'https://api.github.com/users/' + username;

    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            let ajax = JSON.parse(this.responseText);
            
            setGitHubInfo(ajax)
        }
    };

    ajax.open('GET', url, true);
    ajax.send();
};

function setGitHubInfo(...info){
    let conteudo;
    let html_url; let avatar_url; let name; let public_repos; let public_gists; let followers; let login;

    [{html_url = html_url, avatar_url = avatar_url, name = name, public_repos = public_repos, public_gists = public_gists, followers = followers, login = login}] = info;
    
    console.log(info)
    link.setAttribute("href",`${html_url}`)
    img.setAttribute("src", `${avatar_url}`)
    nome.textContent = `${name}`
    total_repo.textContent = `${public_repos}`
    total_gists.textContent = `${public_gists}`
    total_seg.textContent = `${followers}`
    link_total_repo.setAttribute("href", `https://github.com/${login}?tab=repositories`)
    link_total_gists.setAttribute("href", `https://gist.github.com/${login}`)
    link_total_seg.setAttribute("href", `https://github.com/${login}?tab=followers`)
    
    
}