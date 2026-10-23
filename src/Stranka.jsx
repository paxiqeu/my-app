import React from 'react';

export default function Stranka() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Hlavní navigace */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">MojeLogo</div>
          <div className="space-x-6">
            <a href="#domu" className="hover:text-blue-600 transition">Domů</a>
            <a href="#sluzby" className="hover:text-blue-600 transition">Služby</a>
            <a href="#kontakt" className="hover:text-blue-600 transition">Kontakt</a>
          </div>
        </div>
      </nav>

      {/* Úvodní sekce (Hero Banner) */}
      <header id="domu" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Vítejte na mé React stránce
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Tento web je postavený na moderních technologiích, je rychlý, responzivní a snadno upravitelný.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-0.5">
            Začít hned
          </button>
        </div>
      </header>

      {/* Sekce Služby / Vlastnosti */}
      <main id="sluzby" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Co nabízíme</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Karta 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Vysoká rychlost</h3>
            <p className="text-gray-600">Díky Reactu se stránka načítá bleskově a uživatel nemusí na nic čekat.</p>
          </div>

          {/* Karta 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Responzivní design</h3>
            <p className="text-gray-600">Web vypadá skvěle na mobilních telefonech, tabletech i počítačích.</p>
          </div>

          {/* Karta 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold mb-2">Snadná správa</h3>
            <p className="text-gray-600">Kód je čistě strukturovaný, takže můžete cokoli okamžitě změnit.</p>
          </div>
        </div>
      </main>

      {/* Patička */}
      <footer id="kontakt" className="bg-gray-950 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MojeLogo. Všechna práva vyhrazena.</p>
      </footer>

    </div>
  );
}
