document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const menu = this.parentElement.querySelector('.dropdown-menu');

        
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.style.display = 'none';
        });

      
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
});


document.addEventListener('click', function(e){
    if(!e.target.closest('.dropdown')){
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});