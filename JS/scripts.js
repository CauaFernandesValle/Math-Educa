document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('lousaDigital');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 3350;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let lapisAtivo = false;
        let borrachaAtivo = false;
        let desenhando = false;

        const lapisSCR = document.getElementById('lapisSCR');
        const borrachaSCR = document.getElementById('borrachaSCR');
        const resetSCR = document.getElementById('resetSCR');

        lapisSCR.addEventListener('click', () => {
            if (borrachaAtivo) {
                borrachaAtivo = false;
                borrachaSCR.classList.remove('ativo');
            }
            lapisAtivo = !lapisAtivo;
            lapisSCR.classList.toggle('ativo');
        });

        borrachaSCR.addEventListener('click', () => {
            if (lapisAtivo) {
                lapisAtivo = false;
                lapisSCR.classList.remove('ativo');
            }
            borrachaAtivo = !borrachaAtivo;
            borrachaSCR.classList.toggle('ativo');
        });

        resetSCR.addEventListener('click', () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        function iniciarDesenho(event) {
            desenhando = true;
            desenhar(event);
        }

        function pararDesenho() {
            desenhando = false;
            ctx.beginPath();
        }

        function desenhar(event) {
            if (!desenhando) return;
            ctx.lineCap = 'round';

            if (lapisAtivo) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
            } else if (borrachaAtivo) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 20;
            } else {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        canvas.addEventListener('mousedown', iniciarDesenho);
        canvas.addEventListener('mouseup', pararDesenho);
        canvas.addEventListener('mousemove', desenhar);
        canvas.addEventListener('mouseleave', pararDesenho);
    }

    const numero1 = document.getElementById('num1');
    const numero2 = document.getElementById('num2');
    const resultado = document.getElementById('resp');
    const botaoGerar = document.getElementById('gerar');

    if (botaoGerar) {
        function gerarNovoProblema() {
            let valor1 = Math.floor(Math.random() * 68) + 32;
            let valor2 = Math.floor(Math.random() * 68) + 32;
            numero1.textContent = valor1;
            numero2.textContent = valor2;
            resultado.textContent = valor1 * valor2;
            resultado.className = 'resposta-escondida';
        }

        botaoGerar.addEventListener('click', gerarNovoProblema);

        resultado.addEventListener('click', () => {
            resultado.classList.toggle('resposta-escondida');
        });

        gerarNovoProblema();
    }
});