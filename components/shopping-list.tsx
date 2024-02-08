"use client";
import React, { useState, useRef, useEffect } from "react";

type ShoppingItem = {
  name: string;
  price: number;
  active: boolean;
};

type ShoppingItems = Array<ShoppingItem>;

export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItems>([]);
  const [newShoppingItemName, setNewShoppingItemName] = useState<string>("");
  const [newShoppingItemPrice, setNewShoppingItemPrice] = useState<number | "">(
    ""
  );
  const [showResetDialog, setShowResetDialog] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(
    calculateTotalPrice(shoppingItems)
  );

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    if (savedItems) {
      setShoppingItems(JSON.parse(savedItems));
    }
  }, []);

  function setShoppingItemsAdvance(items: ShoppingItems) {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
    setShoppingItems(items);
  }

  function calculateTotalPrice(items: ShoppingItems) {
    return items.reduce((total, item) => {
      if (item.active) {
        return total + item.price;
      }
      return total;
    }, 0);
  }

  function addShoppingItem() {
    if (newShoppingItemName && newShoppingItemPrice) {
      const newItem = {
        name: newShoppingItemName,
        price: Number(newShoppingItemPrice),
        active: true,
      };

      setShoppingItemsAdvance([...shoppingItems, newItem]);

      setNewShoppingItemName("");
      setNewShoppingItemPrice("");

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  }

  function isNumeric(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value);
  }

  function onChangePrice(value: string) {
    if (value === "" || isNumeric(value)) {
      setNewShoppingItemPrice(Number(value));
    }
  }

  function resetShoppingItems() {
    setShoppingItemsAdvance([]);
    setShowResetDialog(false);
  }

  return (
    <>
      {showResetDialog && (
        <div>
          <p>本当にリセットしますか？</p>
          <button type="button" onClick={resetShoppingItems}>
            リセットする
          </button>
        </div>
      )}
      <div>
        <button type="button" onClick={() => setShowResetDialog(true)}>
          リセット
        </button>
        {shoppingItems.length ? (
        <ul>
          {shoppingItems.map((item, index) => (
            <li key={index}>
              {item.name}, {item.price}
            </li>
          ))}
        </ul>

        ) : (
          <p>アイテムを追加してください。</p>
        )}
        <input
          type="text"
          ref={nameInputRef}
          value={newShoppingItemName}
          onChange={(e) => setNewShoppingItemName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addShoppingItem()}
        />
        <input
          value={newShoppingItemPrice}
          onChange={(e) => onChangePrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addShoppingItem()}
        />
        <button type="button" onClick={addShoppingItem}>
          保存
        </button>
        <div>合計：{totalPrice}</div>
      </div>
    </>
  );
}
