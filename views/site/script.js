const products = [
  {id:1,
    name:'Fraisier de morango',
    category:'Bolos',
    price:128,
    rating:'4,9',
    image:'https://images.unsplash.com/photo-1785837623659-34c62ab510d6?auto=format&fit=crop&w=900&q=85',
    description:'Morangos frescos, baunilha e creme leve.'},

  {id:2,
    name:'Caixa de macarons',
    category:'Presentes',
    price:72,
    rating:'4,8',
    image:'https://images.unsplash.com/photo-1775254069077-0eaefcf8b14a?auto=format&fit=crop&w=900&q=85',
    description:'12 unidades, sabores sortidos.'},

  {id:3,
    name:'Tartelette de framboesa',
    category:'Tortas',
    price:26,
    rating:'4,9',
    image:'https://images.unsplash.com/photo-1785960160417-ec8f28e3a799?auto=format&fit=crop&w=900&q=85',
    description:'Framboesas e creme de baunilha.'},

  {id:4,
    name:'Fatia de bolo artesanal',
    category:'Doces',
    price:22,
    rating:'4,7',
    image:'https://images.unsplash.com/photo-1741244133042-970251e76066?auto=format&fit=crop&w=900&q=85',
    description:'Massa macia e cobertura delicada.'}
];
const money = value => value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
//adicionar ao carrinho
const getCart = () => JSON.parse(localStorage.getItem('amelie-cart') || '[]');
const setCart = cart => { localStorage.setItem('amelie-cart',JSON.stringify(cart)); updateCount(); };
const updateCount = () => document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent=getCart().length);
function addToCart(id){ const product=products.find(item=>item.id===id); setCart([...getCart(),product]); showToast(product.name+' foi adicionado ao carrinho.'); }
//notif que foi adicionado
function showToast(message){ const toast=document.querySelector('.toast'); if(!toast)return; toast.querySelector('small').textContent=message; toast.hidden=false; clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>toast.hidden=true,3000); }

function productCard(p){return `<article class="product-card"><img src="${p.image}" alt="${p.name} artesanal apresentado em louça clara"><div class="product-meta"><span>${p.category}</span><span aria-label="Avaliação ${p.rating} de 5">★ ${p.rating}</span></div><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button onclick="addToCart(${p.id})">Adicionar</button></div></article>`}
function renderCatalog(){const grid=document.querySelector('[data-catalog]');if(!grid)return;const query=(document.querySelector('#search')?.value||'').toLowerCase();const active=document.querySelector('.chips .active')?.dataset.category||'Todos';const list=products.filter(p=>(active==='Todos'||p.category===active)&&p.name.toLowerCase().includes(query));grid.innerHTML=list.map(productCard).join('');document.querySelector('[data-results]').textContent=`${list.length} produtos encontrados`;}
function renderCart(){const list=document.querySelector('[data-cart-list]');if(!list)return;const cart=getCart();if(!cart.length){list.innerHTML='<div class="cart-empty"><h2>Seu carrinho está vazio</h2><p>Escolha algo doce para começar.</p><a class="primary" href="catalogo.html">Ver catálogo</a></div>';document.querySelector('[data-summary]').hidden=true;return;}list.innerHTML=cart.map((item,i)=>`<article><img src="${item.image}" alt=""><div><h3>${item.name}</h3><span>${item.category}</span></div><strong>${money(item.price)}</strong><button onclick="removeItem(${i})">Remover</button></article>`).join('');document.querySelector('[data-total]').textContent=money(cart.reduce((sum,item)=>sum+item.price,0));}
function removeItem(index){setCart(getCart().filter((_,i)=>i!==index));renderCart();}
document.addEventListener('DOMContentLoaded',()=>{updateCount();renderCatalog();renderCart();document.querySelector('#search')?.addEventListener('input',renderCatalog);document.querySelectorAll('.chips button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chips button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderCatalog();}));let size=16;document.querySelector('[data-font-minus]')?.addEventListener('click',()=>{size=Math.max(14,size-1);document.documentElement.style.fontSize=size+'px'});document.querySelector('[data-font-plus]')?.addEventListener('click',()=>{size=Math.min(20,size+1);document.documentElement.style.fontSize=size+'px'});});
