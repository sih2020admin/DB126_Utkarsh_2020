document.getElementById("submit_button")?.addEventListener('click',() => {
    var title = (<HTMLSelectElement>document.getElementById("title"))?.value;
    console.log(title)
})