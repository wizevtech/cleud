        // Menu Hamburguer
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Header sticky on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // audio inicio

        (function() {
            const players = document.querySelectorAll('.spotify-player');
            let current = { audio: null, playBtn: null };

            players.forEach(player => {
                const playBtn = player.querySelector('.play-btn');
                const audio = player.querySelector('audio');
                const progress = player.querySelector('.progress-bar');

                if (!audio || !playBtn) return;

                const start = 15; // Começa do início
                const duration = 45; // Toca 30 segundos
                const end = start + duration;

                // Atualiza barra de progresso
                const updateProgress = () => {
                    if (!progress) return;
                    progress.value = ((audio.currentTime - start) / duration) * 100;
                };

                audio.addEventListener('timeupdate', () => {
                    updateProgress();
                    if (audio.currentTime >= end) {
                        audio.pause();
                        audio.currentTime = start;
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        if (current.audio === audio) current = { audio: null, playBtn: null };
                    }
                });

                playBtn.addEventListener('click', () => {
                    // Pausa outro player se estiver tocando
                    if (current.audio && current.audio !== audio) {
                        current.audio.pause();
                        if (current.playBtn) current.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        current = { audio: null, playBtn: null };
                    }

                    if (audio.paused || audio.currentTime >= end) {
                        audio.currentTime = start;
                        audio.play();
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        current = { audio, playBtn };
                    } else {
                        audio.pause();
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        current = { audio: null, playBtn: null };
                    }
                });

                if (progress) {
                    progress.addEventListener('input', () => {
                        audio.currentTime = start + (progress.value / 100) * duration;
                        updateProgress();
                    });
                }
            });
        })();

        // audio fim

        // Galeria de fotos com modal
        const galeriaItens = document.querySelectorAll('.galeria-item');
        const modal = document.getElementById('modal-foto');
        const modalImg = modal.querySelector('img');
        const closeModal = document.querySelector('.close-modal');

        galeriaItens.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImg.src = imgSrc;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });

        // Formulário de contato
        const formContato = document.getElementById('form-contato');

        formContato.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulação de envio
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            formContato.reset();
        });