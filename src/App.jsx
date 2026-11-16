import { useMemo, useState } from 'react';

const navItems = [
  { id: 'overview', label: 'Обзор', icon: '▦' },
  { id: 'orders', label: 'Заказы', icon: '□', count: 12 },
  { id: 'clients', label: 'Клиенты', icon: '◎' },
  { id: 'catalog', label: 'Каталог', icon: '◇' },
  { id: 'warehouse', label: 'Склад', icon: '▤', count: 4 },
  { id: 'reports', label: 'Отчёты', icon: '◔' },
];

const orders = [
  { id: '#R-10482', client: 'КХ «Алтын Дала»', location: 'Алматинская обл.', product: 'Томат Бобкат F1', amount: '486 000 ₸', state: 'К оплате', tone: 'orange', initials: 'АД' },
  { id: '#R-10481', client: 'ТОО «Agro Union»', location: 'г. Шымкент', product: 'Капельная лента 8 mil', amount: '1 240 000 ₸', state: 'В сборке', tone: 'blue', initials: 'AU' },
  { id: '#R-10480', client: 'КХ «Береке»', location: 'Жамбылская обл.', product: 'Огурец Пасамонте F1', amount: '312 500 ₸', state: 'Отгружен', tone: 'green', initials: 'БК' },
  { id: '#R-10479', client: 'ТОО «Green Field»', location: 'г. Павлодар', product: 'Перец Клаудио F1', amount: '728 000 ₸', state: 'Подтверждён', tone: 'violet', initials: 'GF' },
];

const stock = [
  { name: 'Томат Бобкат F1', sku: 'SEM-TOM-014', unit: 'пак. 1 000 сем.', stock: 124, total: 180, status: 'В норме' },
  { name: 'Огурец Пасамонте F1', sku: 'SEM-CUC-027', unit: 'пак. 1 000 сем.', stock: 39, total: 150, status: 'Низкий остаток' },
  { name: 'Перец Клаудио F1', sku: 'DRU-PEP-009', unit: 'пак. 500 сем.', stock: 91, total: 120, status: 'В норме' },
];

const tasks = [
  { title: 'Подтвердить отгрузку для «Altyn Dala»', detail: 'Заказ #R-10482 · до 14:30', type: 'urgent' },
  { title: 'Сверить оплату по счёту № 248', detail: 'ТОО «Agro Union» · бухгалтерия', type: 'normal' },
  { title: 'Созвон с новым клиентом', detail: 'КХ «Жетісу» · 16:00', type: 'normal' },
];

function IconButton({ children, label, onClick }) {
  return <button className="icon-button" aria-label={label} onClick={onClick}>{children}</button>;
}

function MiniLogo() { return <div className="mini-logo" aria-label="Rinda"><i /><i /><i /><b>rinda</b></div>; }

function Header({ onCreate }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return <header className="topbar"><div className="breadcrumb"><span>Продажи</span><strong>Обзор</strong></div><div className="top-actions"><div className={`search ${searchOpen ? 'search-active' : ''}`}><button aria-label="Открыть поиск" onClick={() => setSearchOpen(true)}>⌕</button><input autoFocus={searchOpen} placeholder="Поиск клиента или заказа" onBlur={() => setSearchOpen(false)} /></div><button className="new-order" onClick={onCreate}><span>＋</span> Новый заказ</button><IconButton label="Уведомления">♢<em /></IconButton><button className="profile" aria-label="Профиль Айгерим Ермековой"><span>АЕ</span><i>⌄</i></button></div></header>;
}

function RevenueChart() {
  const points = '8,118 55,97 102,104 149,68 196,75 243,43 290,55 337,32 384,46 431,22 478,37 525,15 572,31';
  return <div className="chart-wrap"><div className="chart-grid"><span /><span /><span /><span /></div><svg viewBox="0 0 580 142" role="img" aria-label="График продаж за неделю"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9cc57e" stopOpacity=".28"/><stop offset="1" stopColor="#9cc57e" stopOpacity="0"/></linearGradient></defs><path d={`M ${points} L 572 142 L 8 142 Z`} fill="url(#fill)" /><polyline points={points} fill="none" stroke="#709b55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="337" cy="32" r="4.5" fill="#fff" stroke="#709b55" strokeWidth="2.5" /></svg><div className="chart-tip"><b>1 284 000 ₸</b><span>Чт, 14 ноября</span></div><div className="chart-days"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div></div>;
}

function MetricCard({ label, value, delta, kind, children }) { return <article className={`metric-card ${kind}`}><div className="metric-top"><span>{label}</span><button aria-label={`Подробнее: ${label}`}>↗</button></div><div className="metric-value">{value}</div><div className="metric-bottom"><span className={delta?.startsWith('+') ? 'positive' : ''}>{delta}</span>{children}</div></article>; }

function OrdersTable() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => orders.filter((order) => `${order.client} ${order.product} ${order.id}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <section className="table-card"><div className="section-card-head"><div><h2>Заказы в работе</h2><p>Актуальные заявки на сегодня</p></div><a href="#orders">Все заказы <span>↗</span></a></div><div className="table-tools"><div className="compact-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найти заказ" /></div><button className="filter-button">Фильтр <span>⌄</span></button></div><div className="orders-table"><div className="table-row table-labels"><span>Заказ</span><span>Клиент</span><span>Товар</span><span>Сумма</span><span>Статус</span><span /></div>{filtered.map((order) => <div className="table-row" key={order.id}><strong>{order.id}</strong><div className="client"><span className={`client-avatar ${order.tone}`}>{order.initials}</span><div><b>{order.client}</b><small>{order.location}</small></div></div><span className="product-name">{order.product}</span><b className="amount">{order.amount}</b><span className={`state ${order.tone}`}>{order.state}</span><button className="more" aria-label={`Действия для ${order.id}`}>•••</button></div>)}{!filtered.length && <div className="no-results">Заказы не найдены</div>}</div></section>;
}

function StockCard() { return <section className="stock-card"><div className="section-card-head"><div><h2>Остатки на складе</h2><p>Склад Алматы · обновлено 10 мин назад</p></div><button className="more">•••</button></div><div className="stock-list">{stock.map((item) => <div className="stock-row" key={item.sku}><div className="seed-icon">✣</div><div className="stock-name"><b>{item.name}</b><small>{item.sku} · {item.unit}</small></div><div className="stock-meter"><div><span style={{ width: `${(item.stock / item.total) * 100}%` }} /></div><b>{item.stock}<small> / {item.total}</small></b></div><span className={`stock-status ${item.status === 'В норме' ? 'good' : 'warning'}`}>{item.status}</span></div>)}</div><button className="stock-link">Открыть склад <span>↗</span></button></section>; }

function Sidebar({ active, setActive }) { return <aside className="sidebar"><div><MiniLogo /><div className="company-switch"><span className="company-mark">R</span><div><b>РИНДА</b><small>Казахстан</small></div><i>⌄</i></div><nav>{navItems.map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}><span>{item.icon}</span>{item.label}{item.count && <em>{item.count}</em>}</button>)}</nav></div><div className="sidebar-bottom"><button><span>?</span> Центр помощи</button><div className="promo"><span>✦</span><p><b>Сезон 2025</b>Подготовьте склад к активным продажам.</p><a href="#promo">Подробнее</a></div></div></aside>; }

function CreateModal({ close }) {
  const [saved, setSaved] = useState(false);
  const submit = (event) => { event.preventDefault(); setSaved(true); };
  return <div className="modal-backdrop" role="presentation"><form className="modal" onSubmit={submit}><button className="modal-close" type="button" onClick={close}>×</button>{saved ? <div className="modal-success"><span>✓</span><h2>Черновик создан</h2><p>Заказ сохранён в разделе «Заказы».</p><button type="button" onClick={close}>Готово</button></div> : <><div className="modal-title"><span>Новый заказ</span><h2>Создайте заявку</h2><p>Данные в этой CRM являются демонстрационными.</p></div><label>Клиент<input required placeholder="Например, КХ «Жетісу»" /></label><label>Товар<select defaultValue=""><option value="" disabled>Выберите товар</option><option>Томат Бобкат F1</option><option>Огурец Пасамонте F1</option><option>Капельная лента 8 mil</option></select></label><label>Сумма, ₸<input required inputMode="numeric" placeholder="0" /></label><button className="modal-submit" type="submit">Создать заказ <span>↗</span></button></>}</form></div>;
}

function Dashboard() { return <main className="content"><section className="dashboard-heading"><div><p className="date-label">Понедельник, 18 ноября</p><h1>Доброе утро, Айгерим <span>✦</span></h1><p className="subtitle">Вот что происходит в продажах сегодня.</p></div><button className="period-button">Этот месяц <span>⌄</span></button></section><section className="metrics"><MetricCard label="Продажи за месяц" value="18,6 млн ₸" delta="+12,4% к октябрю" kind="olive"><div className="spark"><i /><i /><i /><i /><i /><i /><i /></div></MetricCard><MetricCard label="Новые клиенты" value="24" delta="+6 за неделю" kind="peach"><div className="mini-people"><span>Н</span><span>Б</span><span>А</span><b>+21</b></div></MetricCard><MetricCard label="Заказы в работе" value="12" delta="7 требуют внимания" kind="blue"><div className="order-bubbles"><span /><span /><span /><span /></div></MetricCard><MetricCard label="Просрочено оплат" value="1,28 млн ₸" delta="3 счёта" kind="lilac"><div className="due-date">до 22 ноя</div></MetricCard></section><section className="middle-grid"><article className="sales-card"><div className="section-card-head"><div><h2>Динамика продаж</h2><p>Выручка за 11-17 ноября</p></div><div className="chart-total"><b>5 820 000 ₸</b><span>+18,2%</span></div></div><RevenueChart /></article><article className="tasks-card"><div className="section-card-head"><div><h2>Задачи на сегодня</h2><p>3 активные задачи</p></div><button className="more">•••</button></div><div className="task-list">{tasks.map((task) => <div className="task" key={task.title}><button className={`check ${task.type}`} aria-label="Отметить выполненной" /><div><b>{task.title}</b><small>{task.detail}</small></div><button className="more" aria-label="Больше действий">•••</button></div>)}</div><button className="task-add">＋ Добавить задачу</button></article></section><section className="bottom-grid"><OrdersTable /><StockCard /></section></main>; }

function App() { const [active, setActive] = useState('overview'); const [creating, setCreating] = useState(false); return <div className="app-shell"><Sidebar active={active} setActive={setActive} /><div className="main-shell"><Header onCreate={() => setCreating(true)} /><Dashboard /></div>{creating && <CreateModal close={() => setCreating(false)} />}</div>; }

export default App;
