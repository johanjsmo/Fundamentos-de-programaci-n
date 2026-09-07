/**
 * BASE DE DATOS DE PRODUCTOS - LA MONCHERÍA MX
 * Antojería Urbana & Sweet Treats
 * Precios en Pesos Mexicanos ($ MXN)
 */

const CATEGORIES = [
  { id: 'todos', name: '🔥 Todo el Menú', icon: '✨' },
  { id: 'combos', name: '👑 Combos Monchosos', icon: '👑' },
  { id: 'hamburguesas', name: '🍔 Burgers & Dogos', icon: '🍔' },
  { id: 'tacos-burros', name: '🌮 Tacos & Burros', icon: '🌮' },
  { id: 'botanas', name: '🍟 Botanas & Monchis', icon: '🍟' },
  { id: 'postres', name: '🧇 Waffles & Crepas', icon: '🧇' },
  { id: 'bebidas', name: '🥤 Bebidas & Malteadas', icon: '🥤' },
  { id: 'ofertas', name: '⚡ Promos Especiales', icon: '🏷️' }
];

const EXTRAS_OPTIONS = {
  comida: [
    { id: 'extra-queso', name: 'Extra Queso Oaxaca / Asadero Fundido', price: 20 },
    { id: 'extra-tocino', name: 'Tocino Crujiente Ahumado (2 tiras)', price: 22 },
    { id: 'extra-aguacate', name: 'Guacamole Rústico / Aguacate', price: 18 },
    { id: 'extra-champis', name: 'Champiñones Salteados a la Mantequilla', price: 16 },
    { id: 'extra-papas', name: 'Porción Extra de Papas Francesas', price: 30 }
  ],
  postre: [
    { id: 'extra-helado', name: 'Bola Extra de Helado Artesanal (Vainilla/Chocolate)', price: 25 },
    { id: 'extra-nutella', name: 'Nutella Calientita Extra', price: 18 },
    { id: 'extra-fresas', name: 'Fresas Frescas Fileteadas', price: 15 },
    { id: 'extra-biscoff', name: 'Galleta Lotus Biscoff Triturada', price: 18 },
    { id: 'extra-cajeta', name: 'Bañado de Cajeta Quemada de Celaya', price: 14 }
  ],
  bebida: [
    { id: 'extra-escarchado', name: 'Escarchado con Chamoy y Chile Tajín', price: 10 },
    { id: 'extra-perlas', name: 'Perlas Explosivas Frutales (Popping Boba)', price: 15 },
    { id: 'extra-banderilla', name: 'Banderilla de Tamarindo Enchilado', price: 12 },
    { id: 'extra-chantilly', name: 'Copete Extra de Crema Chantilly', price: 12 },
    { id: 'extra-espresso', name: 'Shot Extra de Café Espresso', price: 18 }
  ],
  salsas: [
    { id: 'salsa-ninguna', name: 'Sin Picante / Aderezo Normal' },
    { id: 'salsa-verde', name: 'Salsa Verde Cremosa de Aguacate (Pica poco)' },
    { id: 'salsa-roja', name: 'Salsa Roja de Chile de Árbol Tatemado (Pica rico)' },
    { id: 'salsa-habanero', name: 'Salsa Xnipec de Habanero Asado (¡Brava!)' },
    { id: 'salsa-macha', name: 'Salsa Macha con Semillas & Ajonjolí (Poderosa)' }
  ],
  bebidasCombo: [
    { id: 'coca', name: 'Coca-Cola Original (Lata 355ml)' },
    { id: 'coca-sin', name: 'Coca-Cola Zero Azúcar (Lata 355ml)' },
    { id: 'joya-manzana', name: 'Joya de Manzana (Vidrio 500ml)' },
    { id: 'agua-horchata', name: 'Agua de Horchata Fresa Artesanal (500ml)' },
    { id: 'agua-jamaica', name: 'Agua de Jamaica con Guayaba (500ml)' },
    { id: 'agua-limon', name: 'Agua de Limón con Chía y Pepino (500ml)' },
    { id: 'cafe-olla', name: 'Café de Olla Frío Tradicional (500ml)' },
    { id: 'rusa-combo', name: 'Rusa con Toronja y Tajín (500ml)' }
  ]
};

const MENU_ITEMS = [
  // ================= COMBOS MONCHOSOS =================
  {
    id: 'combo-mal-puerco',
    name: 'Combo "El Mal del Puerco"',
    category: 'combos',
    price: 215,
    oldPrice: 265,
    tag: '👑 EL MÁS PEDIDO',
    tagColor: '#ff4757',
    description: 'Hamburguesa Doble Smash con costra de queso Oaxaca y tocino crocante + Papas Gajo con queso cheddar + Bebida a elegir + Mini Waffle con Nutella.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80',
    type: 'comida',
    includesDrink: true,
    isCombo: true
  },
  {
    id: 'combo-bajon-callejero',
    name: 'Combo "El Bajón de la Madrugada"',
    category: 'combos',
    price: 185,
    oldPrice: 225,
    tag: '⚡ NOCTURNO BRUTAL',
    tagColor: '#ff9f43',
    description: 'Burro Gigante de Asada con queso asadero y aguacate + Porción de Dorilocos preparados con cueritos y chamoy + Refresco o Agua fresca de 1 Litro.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    type: 'comida',
    includesDrink: true,
    isCombo: true
  },
  {
    id: 'combo-pareja-monchosa',
    name: 'Combo "Pareja Monchosa" (Pa\' Dos)',
    category: 'combos',
    price: 325,
    oldPrice: 385,
    tag: '❤️ ESPECIAL PARA 2',
    tagColor: '#ff6b81',
    description: '2 Dogos Especiales envueltos en tocino + 1 Hamburguesa Clásica Monchosa + Orden Grande de Papas Fritas + 2 Bebidas + 1 Crepa Dulce para compartir.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=700&q=80',
    type: 'comida',
    includesDrink: true,
    isCombo: true
  },
  {
    id: 'combo-rompe-dietas',
    name: 'Combo "El Rompe-Dietas"',
    category: 'combos',
    price: 235,
    oldPrice: 275,
    tag: '🌮 TAQUIZA & MONCHIS',
    tagColor: '#10b981',
    description: '4 Tacos de Sirloin con Costra de Queso doradita + Salchipapas con quesillo fundido + Agua de Horchata 1L + 3 Churros con Canela y Azúcar.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    type: 'comida',
    includesDrink: true,
    isCombo: true
  },
  {
    id: 'combo-dulce-pecado',
    name: 'Combo "Dulce Pecado"',
    category: 'combos',
    price: 175,
    oldPrice: 215,
    tag: '🧇 SWEET LOVERS',
    tagColor: '#9b59b6',
    description: '1 Waffle Monchoso con helado de vainilla, fresas y Nutella + 1 Crepa con Cajeta quemada y plátano + 2 Cafés Fríos o Sodas Italianas.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80',
    type: 'postre',
    includesDrink: true,
    isCombo: true
  },

  // ================= HAMBURGUESAS & DOGOS =================
  {
    id: 'burger-monchosa-suprema',
    name: 'Hamburguesa Monchosa Suprema',
    category: 'hamburguesas',
    price: 135,
    tag: '🔥 FAVORITO',
    tagColor: '#ff4757',
    description: 'Doble carne smash 100% de res con costra de queso Oaxaca, tiras de tocino crocante, cebolla caramelizada, aderezo de chipotle ahumado y pan brioche con ajonjolí negro.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'burger-hawaiana-callejera',
    name: 'Burger Hawaiana Callejera',
    category: 'hamburguesas',
    price: 125,
    tag: '🍍 AGRIDULCE TOP',
    tagColor: '#ffa502',
    description: 'Carne jugosa de res, jamón de pavo dorado a la plancha, piña asada con mantequilla y azúcar morena, queso manchego derretido y salsa BBQ de la casa.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'burger-crispy-chicken',
    name: 'Burger Pollo Crispy Ranch',
    category: 'hamburguesas',
    price: 130,
    tag: '🍗 EXTRA CRUJIENTE',
    tagColor: '#2ed573',
    description: 'Pechuga de pollo empanizada con hojuelas de maíz ultra crujientes, aderezo Ranch con hierbas finas, pepinillos dulces y queso cheddar fundido.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'dogo-embarazado',
    name: 'Dogo Especial "Embarazado"',
    category: 'hamburguesas',
    price: 75,
    tag: '🌭 CLÁSICO SONORENSE',
    tagColor: '#e056fd',
    description: 'Salchicha de pavo jumbo envuelta en doble tocino crocante, rellena de queso asadero, cubierta con frijoles puercos, tomate picado, cebolla asada y mayonesa preparada.',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'dogo-chori-queso',
    name: 'Dogo Chori-Queso Fuego',
    category: 'hamburguesas',
    price: 80,
    tag: '🌶️ CON CHORIZO',
    tagColor: '#eb4d4b',
    description: 'Salchicha asada cubierta con abundante chorizo casero dorado al carbón, queso Oaxaca derretido en hebra, aderezo de jalapeño y chiles toreados.',
    image: 'https://images.unsplash.com/photo-1627054234553-6111ee85cfbe?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },

  // ================= TACOS & BURROS =================
  {
    id: 'burro-destapacanos',
    name: 'Burro Gigante "El Destapacaños"',
    category: 'tacos-burros',
    price: 145,
    tag: '⭐ PESA MEDIO KILO',
    tagColor: '#ff4757',
    description: 'Tortilla sobaquera gigante de harina de trigo, rellena de bistec de sirloin al carbón, queso asadero fundido, frijoles refritos con manteca, aguacate cremoso y cebollitas asadas.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'burro-pastor-queso',
    name: 'Burrito Monchoso al Pastor',
    category: 'tacos-burros',
    price: 130,
    tag: '🌮 SABOR DEL TROMPO',
    tagColor: '#ff9f43',
    description: 'Carne al pastor marinada con achiote y especias tradicionales, piña asada, queso manchego gratinado, cebolla desflemada y cilantro fresco.',
    image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'orden-tacos-costra',
    name: 'Orden de 4 Tacos con Costra de Queso',
    category: 'tacos-burros',
    price: 125,
    tag: '🧀 PURA COSTRA',
    tagColor: '#f0932b',
    description: 'Tortilla de maíz nixtamalizado con costra de queso gouda dorada en plancha caliente, carne asada o pastor, cilantro picado, cebollita y salsa a elegir.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'gringa-monchosa',
    name: 'Gringa Monchosa Doble Queso',
    category: 'tacos-burros',
    price: 95,
    tag: '🌮 CLÁSICA',
    tagColor: '#6ab04c',
    description: 'Dos tortillas de harina rellenas de abundante carne al pastor jugosa, queso asadero derretido de orilla a orilla y trocitos de piña a la plancha.',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },

  // ================= BOTANAS & MONCHIS =================
  {
    id: 'papas-locas-asada',
    name: 'Papas Locas / Asada Fries',
    category: 'botanas',
    price: 125,
    tag: '🍟 MONCHIS TOTAL',
    tagColor: '#f9ca24',
    description: 'Cama enorme de papas fritas sazonadas con sal de ajo y paprika, cubiertas con carne asada picada, queso cheddar derretido, crema ácida, guacamole y jalapeños.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'salchipapas-especiales',
    name: 'Salchipapas Especiales con Quesillo',
    category: 'botanas',
    price: 85,
    tag: '✨ CALLEJERO CHIDO',
    tagColor: '#badc58',
    description: 'Papas a la francesa doraditas con salchichas en cortes de espiral, queso Oaxaca derretido por encima, toque de salsa maggi, aderezo mil islas y salsa catsup.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'boneless-mango-habanero',
    name: 'Boneless Bañados (300g)',
    category: 'botanas',
    price: 130,
    tag: '🌶️ MANGO HABANERO / BBQ',
    tagColor: '#eb4d4b',
    description: 'Trozos tiernos y crujientes de pechuga de pollo bañados en salsa Mango Habanero o BBQ Chipotle ahumada. Acompañados de bastones de apio y aderezo Ranch.',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'dorilocos-preparados',
    name: 'Dorilocos / Tostilocos Monchosos',
    category: 'botanas',
    price: 70,
    tag: '🌶️ BOTANA MEXICANA',
    tagColor: '#ff7979',
    description: 'Bolsa abierta con cueritos en vinagre, cacahuates japoneses, pepino en cubos, jícama fresca, chamoy líquido, miguelito en polvo, salsa valentina y harto limón.',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },

  // ================= POSTRES (WAFFLES, CREPAS, ETC.) =================
  {
    id: 'waffle-gloton-supremo',
    name: 'Waffle Glotón Supremo',
    category: 'postres',
    price: 98,
    tag: '🧇 EL REY DULCE',
    tagColor: '#e056fd',
    description: 'Waffle belga recién salido de la wafflera, crujiente por fuera y suave por dentro, bañado con Nutella tibia, fresas frescas, plátano, nuez tostada y una bola de helado de vainilla.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },
  {
    id: 'waffle-lotus-cajeta',
    name: 'Waffle Biscoff & Cajeta Celaya',
    category: 'postres',
    price: 105,
    tag: '🍪 NOVEDAD VIRAL',
    tagColor: '#f0932b',
    description: 'Waffle bañado en crema de galleta Lotus Biscoff, cajeta quemada artesanal, trozos crocantes de galleta Lotus y azúcar glass espolvoreada.',
    image: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },
  {
    id: 'crepa-tentacion-nutella',
    name: 'Crepa Francesa Nutella & Fresa',
    category: 'postres',
    price: 85,
    tag: '🍓 FAVORITA',
    tagColor: '#ff4757',
    description: 'Crepa doradita a la mantequilla, doblada en abanico, rellena de abundante Nutella, fresas frescas picadas, plátano, lechera y lluvia de chocolate blanco.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },
  {
    id: 'crepa-michoacana-cajeta',
    name: 'Crepa La Michoacana (Cajeta & Nuez)',
    category: 'postres',
    price: 80,
    tag: '🌰 100% MEXICANA',
    tagColor: '#e67e22',
    description: 'Rellena con cajeta envinada de Celaya, nuez pecana finamente picada y plátano caramelizado en la plancha con canela molida.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },
  {
    id: 'marquesita-yucateca',
    name: 'Marquesita Yucateca Original',
    category: 'postres',
    price: 75,
    tag: '🧀 DULCE Y SALADO',
    tagColor: '#f1c40f',
    description: 'Barquillo crujiente enrollado en plancha de hierro caliente, relleno de auténtico Queso de Bola holandés (Gallo) rallado y Nutella cremosa.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },
  {
    id: 'churros-rellenos-trio',
    name: 'Trío de Churros Rellenos',
    category: 'postres',
    price: 65,
    tag: '✨ RECIÉN HECHOS',
    tagColor: '#e74c3c',
    description: 'Tres churros artesanales gigantes fritos al momento, espolvoreados con azúcar y canela, rellenos de: 1 de Cajeta, 1 de Nutella y 1 de Lechera.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=700&q=80',
    type: 'postre'
  },

  // ================= BEBIDAS & MALTEADAS (CATÁLOGO EXPANDIDO) =================
  {
    id: 'mangonada-frappe',
    name: 'Mangonada Frappé con Chamoy & Gomitas',
    category: 'bebidas',
    price: 65,
    tag: '🥭 SÚPER ANTOJO',
    tagColor: '#ffa502',
    description: 'Frappé espeso de mango natural, escarchado generosamente con chamoy líquido y chile piquín Miguelito, banderilla de tamarindo y gomitas enchiladas.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'malteada-mazapan',
    name: 'Malteada Monchosa de Mazapán',
    category: 'bebidas',
    price: 85,
    tag: '🥜 100% MEXICANA',
    tagColor: '#e17055',
    description: 'Helado de vainilla artesanal batido con 2 mazapanes de la rosa completos, leche entera, canela en polvo y crema batida con trozos de cacahuate tostado.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'malteada-choco-monchis',
    name: 'Malteada Choco-Monchis Monstruo',
    category: 'bebidas',
    price: 85,
    tag: '🍫 MONUMENTAL',
    tagColor: '#535c68',
    description: 'Malteada espesa de helado de chocolate holandés con leche entera, vaso escarchado con Nutella y chispas, copete gigante de crema batida y un mini brownie casero encima.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'malteada-fresa-cheesecake',
    name: 'Malteada Fresa Cheesecake',
    category: 'bebidas',
    price: 85,
    tag: '🍓 CREMOSA',
    tagColor: '#ff7675',
    description: 'Helado de fresa artesanal mezclado con queso crema suave, mermelada natural con trocitos de fresa, crema chantilly y galleta María triturada.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'agua-horchata-fresa-litro',
    name: 'Agua Fresca de Litro: Horchata Fresa',
    category: 'bebidas',
    price: 45,
    tag: '🥛 1 LITRO',
    tagColor: '#fab1a0',
    description: 'Nuestra horchata secreta con canela, leche evaporada y puré de fresas naturales machacadas al momento. Servida bien helada en vaso de litro.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'agua-jamaica-guayaba',
    name: 'Agua Fresca de Litro: Jamaica & Guayaba',
    category: 'bebidas',
    price: 45,
    tag: '🌺 1 LITRO',
    tagColor: '#d63031',
    description: 'Infusión en frío de flor de jamaica seleccionada con pulpa natural de guayaba, toque de romero y rodajas de limón. Ultra refrescante en vaso de 1L.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'agua-limon-chia-litro',
    name: 'Agua Fresca de Litro: Limón con Chía',
    category: 'bebidas',
    price: 40,
    tag: '🍋 100% NATURAL',
    tagColor: '#00b894',
    description: 'Zumo de limón fresco exprimido al momento, semillas de chía hidratadas, rodajas de pepino y menta fresca. Súper refrescante para el calor.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'rusa-refrescante-toronja',
    name: 'Rusa Monchosa con Toronja & Tajín',
    category: 'bebidas',
    price: 50,
    tag: '🧊 QUITA-SED',
    tagColor: '#e84393',
    description: 'Agua mineral de manantial burbujeante con jugo natural de toronja recién exprimido, limón, sal de grano y escarchado de chamoy con Tajín.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'frappe-moka-caramelo',
    name: 'Frappé de Moka & Caramelo Salado',
    category: 'bebidas',
    price: 70,
    tag: '☕ CON ESPRESSO',
    tagColor: '#6c5ce7',
    description: 'Doble shot de café espresso arábica, chocolate fundido, hielo granizado, jarabe de caramelo salado y copete de crema batida con cocoa.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'cafe-olla-frio',
    name: 'Café de Olla Frío Tradicional',
    category: 'bebidas',
    price: 45,
    tag: '🪵 TRADICIONAL',
    tagColor: '#795548',
    description: 'El clásico café de olla hervido con piloncillo y canela en raja, enfriado a la perfección y servido con cubos de hielo en vaso escarchado con canela.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'soda-italiana-frutos',
    name: 'Soda Italiana Frutos Rojos / Manzana Verde',
    category: 'bebidas',
    price: 55,
    tag: '🫧 BURBUJEANTE',
    tagColor: '#0984e3',
    description: 'Agua gasificada con jarabe frutal concentrado de frutos silvestres o manzana ácida, hielos y perlas explosivas de mora azul.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },
  {
    id: 'refresco-vidrio-frio',
    name: 'Refresco en Botella de Vidrio (500ml)',
    category: 'bebidas',
    price: 35,
    tag: '🧊 BIEN HELADO',
    tagColor: '#0984e3',
    description: 'La clásica botella de vidrio que sabe mejor: Coca-Cola original, Joya de Manzana, Sprite o Jarritos de Mandarina.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80',
    type: 'bebida'
  },

  // ================= OFERTAS ESPECIALES =================
  {
    id: 'promo-martes-dogos',
    name: 'Martes 2x1 en Dogos Especiales',
    category: 'ofertas',
    price: 75,
    oldPrice: 150,
    tag: '⚡ SOLO MARTES',
    tagColor: '#d63031',
    description: 'Pide un Dogo Especial "Embarazado" con doble tocino y llévate el segundo totalmente GRATIS. ¡Ideal para compartir o duplicar el antojo!',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'promo-jueves-papas',
    name: 'Jueves Monchoso: Papas Locas al 50%',
    category: 'ofertas',
    price: 62,
    oldPrice: 125,
    tag: '🏷️ 50% DE DESCUENTO',
    tagColor: '#e17055',
    description: 'Papas Locas con carne asada y queso cheddar fundido a mitad de precio en cualquier pedido superior a $180 MXN.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    type: 'comida'
  },
  {
    id: 'promo-estudiante',
    name: 'Promo Estudiante / Bajón Escolar',
    category: 'ofertas',
    price: 99,
    oldPrice: 135,
    tag: '🎓 PACK ECONÓMICO',
    tagColor: '#6c5ce7',
    description: '1 Dogo Especial + Papas a la francesa medianas + 1 Refresco de lata 355ml. ¡Bueno, bonito, barato y llenador!',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=700&q=80',
    type: 'comida',
    includesDrink: true
  }
];

// Opciones para el Constructor Interactivo "Arma tu Antojo" (Waffle / Crepa personalizado)
const BUILDER_DATA = {
  bases: [
    { id: 'base-waffle', name: 'Waffle Belga Esponjoso', price: 55, icon: '🧇' },
    { id: 'base-crepa', name: 'Crepa Dorada a la Mantequilla', price: 50, icon: '🥞' },
    { id: 'base-marquesita', name: 'Marquesita Crujiente Enrollada', price: 45, icon: '🥖' }
  ],
  spreads: [
    { id: 'spread-nutella', name: 'Nutella Original Avellana', price: 18, icon: '🍫' },
    { id: 'spread-cajeta', name: 'Cajeta Quemada de Celaya', price: 15, icon: '🍯' },
    { id: 'spread-lechera', name: 'Lechera Condensada', price: 12, icon: '🥛' },
    { id: 'spread-peanut', name: 'Mantequilla de Maní Cremosa', price: 15, icon: '🥜' },
    { id: 'spread-queso-bola', name: 'Queso de Bola Holandés (Edam)', price: 25, icon: '🧀' }
  ],
  fruits: [
    { id: 'fruit-fresas', name: 'Fresas Frescas Fileteadas', price: 15, icon: '🍓' },
    { id: 'fruit-platano', name: 'Plátano Dulce en Rodajas', price: 10, icon: '🍌' },
    { id: 'fruit-moras', name: 'Mix de Frutos Rojos', price: 20, icon: '🫐' }
  ],
  crunchies: [
    { id: 'crunch-nuez', name: 'Nuez Pecana Troceada', price: 15, icon: '🌰' },
    { id: 'crunch-oreo', name: 'Galleta Oreo Triturada', price: 14, icon: '🍪' },
    { id: 'crunch-lotus', name: 'Galleta Lotus Biscoff', price: 18, icon: '🧇' },
    { id: 'crunch-chispas', name: 'Chispas de Chocolate Belga', price: 12, icon: '✨' }
  ],
  toppingsFinales: [
    { id: 'top-helado-vainilla', name: 'Bola de Nieve Vainilla', price: 25, icon: '🍨' },
    { id: 'top-helado-chocolate', name: 'Bola de Nieve Chocolate', price: 25, icon: '🍫' },
    { id: 'top-crema-batida', name: 'Copete de Crema Batida Chantilly', price: 15, icon: '🧁' }
  ]
};
