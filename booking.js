document.addEventListener('DOMContentLoaded', () => {
    const sltbBtn = document.getElementById('sltbBtn');
    const privateBtn = document.getElementById('privateBtn');

    sltbBtn.addEventListener('click', () => {
        window.open('https://sltb.eseat.lk/home', '_blank');
    });

    privateBtn.addEventListener('click', () => {
        window.open('https://busseat.lk/', '_blank');
    });
});
