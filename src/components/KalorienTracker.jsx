import { useUser } from '../context/UserContext';
import React, { useEffect, useState } from 'react';

const KalorienTracker = () => {
  const [data, setData] = useState(null); // Server response for GUR
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useUser(); // Access the userEmail from context

  const [products, setProducts] = useState([]); // List of products with calories
  const [productName, setProductName] = useState(''); // Current product name input
  const [calories, setCalories] = useState(''); // Current calorie input

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      setError('User not logged in');
      return;
    }

    const fetchGURAndProducts = async () => {
      try {
        // Fetch GUR value
        const gurResponse = await fetch(`http://localhost:3000/get-gur?email=${encodeURIComponent(userEmail)}`);
        if (!gurResponse.ok) throw new Error('Fehler beim Laden des GUR');
        const gurData = await gurResponse.json();
        setData(gurData);

        // Fetch products
        const productsResponse = await fetch(`http://localhost:3000/get-products?email=${encodeURIComponent(userEmail)}`);
        if (!productsResponse.ok) throw new Error('Fehler beim Laden der Produkte');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGURAndProducts();
  }, [userEmail]);

  const handleAddProduct = async () => {
    if (productName.trim() && calories.trim() && !isNaN(calories)) {
      try {
        const response = await fetch('http://localhost:3000/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            product: productName,
            calories: parseFloat(calories),
          }),
        });

        if (!response.ok) throw new Error('Fehler beim Hinzufügen des Produkts');

        // Update the product list locally
        setProducts([...products, { name: productName, calories: parseFloat(calories) }]);
        setProductName('');
        setCalories('');
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert('Bitte einen gültigen Produktnamen und Kalorienanzahl eingeben!');
    }
  };

  const handleDeleteProduct = async (productName) => {
    try {
      const response = await fetch('http://localhost:3000/remove-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          product: productName,
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Löschen des Produkts');

      // Aktualisiere die lokale Liste der Produkte
      setProducts(products.filter((product) => product.name !== productName));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleResetDay = async () => {
    try {
      const response = await fetch('http://localhost:3000/reset-day', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
  
      if (!response.ok) throw new Error('Fehler beim Zurücksetzen des Tages');
  
      // Produkte aus der lokalen Liste entfernen
      setProducts([]);
    } catch (err) {
      alert(err.message);
    }
  };

  const calculateRemainingCalories = () => {
    const totalCalories = products.reduce((sum, product) => sum + product.calories, 0);
    return data?.gur ? data.gur - totalCalories : 0;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '18px', color: '#007aff' }}>Lädt...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', fontSize: '18px', color: '#ff3b30' }}>Fehler: {error}</div>;
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', margin: '0 auto', maxWidth: '600px', padding: '20px', color: 'white', backgroundColor: '#333', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Kalorien Tracker</h1>
      </header>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ddd' }}>Neues Produkt hinzufügen</h2>
        <input
          type="text"
          placeholder="Produktname"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#444', color: 'white' }}
        />
        <input
          type="number"
          placeholder="Kalorien"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', border: '1px solid #555', borderRadius: '8px', fontSize: '16px', backgroundColor: '#444', color: 'white' }}
        />
        <button
          onClick={handleAddProduct}
          style={{ display: 'block', width: '80%', margin: '10px auto', padding: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
        >
          Hinzufügen
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handleResetDay}
        style={{
          display: 'block',
          width: '80%',
          margin: '10px auto',
          padding: '10px',
          backgroundColor: '#ff3b30',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Tagreset
      </button>
    </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ddd' }}>Produkte</h2>
        <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left', margin: '0 auto', width: '80%' }}>
          {products.map((product, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #555',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1', textAlign: 'left' }}>{product.name}</div>
              <div style={{ flex: '1', textAlign: 'right' }}>
                {product.calories} kcal
                <button
                  onClick={() => handleDeleteProduct(product.name)}
                  style={{
                    marginLeft: '10px',
                    padding: '5px 15px',
                    backgroundColor: '#ff3b30',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#ddd' }}>Ergebnis</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
          Gesamtumsatz (GUR): {data.gur} kcal
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
          Verbleibende Kalorien: {calculateRemainingCalories()} kcal
        </p>
      </div>
    </div>
  );
};

export default KalorienTracker;
