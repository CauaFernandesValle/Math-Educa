document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('lousaDigital');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 3950;
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
            
            let valor1, valor2, divisao;

            // --- ESTRATÉGIA: GERAR ATÉ ENCONTRAR UM PAR VÁLIDO ---
            while (true) {
                // 1. Gerar o Dividendo (valor1) (ex: 10.0 a 50.0)
                let v1Inteiro = Math.floor(Math.random() * 401) + 100; 
                valor1 = v1Inteiro / 10.0;

                // 2. Gerar o Divisor (valor2) (ex: 2.0 a 9.9)
                let v2Inteiro = Math.floor(Math.random() * 80) + 20;
                valor2 = v2Inteiro / 10.0;

                // 3. Calcular a Divisão
                divisao = valor1 / valor2;

                // 4. VERIFICAR: O resultado tem 3 casas ou menos?
                
                // Corrigir mini-erros de ponto flutuante (ex: 1.0000000001)
                let divisaoCorrigida = parseFloat(divisao.toFixed(8));
                let divisaoStr = divisaoCorrigida.toString();
                
                const casasDecimais = divisaoStr.split('.')[1]?.length || 0;

                // Se for um resultado "limpo" (<= 3 casas), saia do loop
                if (casasDecimais <= 3) {
                    break;
                }
                
                // Se não, o 'while(true)' força a repetição
            }
            
            // --- Exibir os números ---
            
            // Usamos .toFixed(1) apenas para formatar (ex: 50.0)
            numero1.textContent = valor1.toFixed(1).replace('.', ',');
            
            numero2.textContent = valor2.toFixed(1).replace('.', ',');
            
            // O 'divisao' já é o resultado exato e correto.
            // Apenas o convertemos para string.
            resultado.textContent = divisao.toString().replace('.', ',');
            
            resultado.className = 'resposta-escondida';
        }

        botaoGerar.addEventListener('click', gerarNovoProblema);

        resultado.addEventListener('click', () => {
            resultado.classList.toggle('resposta-escondida');
        });

        gerarNovoProblema();
    }
});