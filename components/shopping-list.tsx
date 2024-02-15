"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Eye, EyeOff } from "lucide-react";

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
  const [totalPrice, setTotalPrice] = useState<number>(
    calculateTotalPrice(shoppingItems)
  );
  const [availableButton, setAvailableButton] = useState<boolean>(false);

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
    if (newShoppingItemPrice) {
      const newItem = {
        name: newShoppingItemName,
        price: Number(newShoppingItemPrice),
        active: true,
      };

      setShoppingItemsAdvance([...shoppingItems, newItem]);

      setAvailableButton(false);
      setNewShoppingItemName("");
      setNewShoppingItemPrice("");

      // focusToNameInput();
    }
  }

  function focusToNameInput() {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }

  function isNumeric(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value);
  }

  function onItemPriceChange(value: string) {
    if (value && !value.startsWith("0") && isNumeric(value)) {
      setNewShoppingItemPrice(Number(value));
      setAvailableButton(true);
    } else {
      setNewShoppingItemPrice("");
      setAvailableButton(false);
    }
  }

  function resetShoppingItems() {
    setShoppingItemsAdvance([]);
  }

  function triggerActivation(index: number) {
    const currentShoppingItems = shoppingItems;

    currentShoppingItems[index].active = currentShoppingItems[index].active
      ? false
      : true;

    setShoppingItemsAdvance(currentShoppingItems);
    setTotalPrice(calculateTotalPrice(shoppingItems));
  }

  function onItemNameChange(name: string) {
    const newName = name;
    setNewShoppingItemName(newName);
  }

  return (
    <>
      <div className="container py-3 border-b sticky top-0 bg-neutral-50 shadow z-10">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" type="button">
                  リセット
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>リセット</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center">
                    リセットしますか？
                    <br />
                    この操作は元には戻せません。
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={resetShoppingItems}
                    >
                      リセットする
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-right">
            ￥<span className="text-3xl font-bold pl-1">{totalPrice}</span>
          </div>
          <div></div>
        </div>
      </div>
      <div className="pt-5 pb-40">
        {shoppingItems.length ? (
          <Table>
            <TableBody>
              {shoppingItems.map((item, index) => (
                <TableRow
                  key={index}
                  className={clsx(!item.active && "opacity-30")}
                >
                  <TableCell className="py-2">{item.name}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex justify-end items-center gap-x-1">
                      <div className="text-right">
                        ￥
                        <span className="text-xl font-bold pl-1">
                          {item.price}
                        </span>
                      </div>
                      <Button
                        onClick={() => triggerActivation(index)}
                        variant="ghost"
                        size="icon"
                      >
                        {item.active ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center">アイテムを追加してください。</p>
        )}
      </div>
      <div className="fixed left-0 bottom-0 right-0 container py-3 border-t bg-neutral-50 shadow">
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <Input
                className="text"
                placeholder="商品名"
                type="text"
                ref={nameInputRef}
                value={newShoppingItemName}
                onChange={(e) => onItemNameChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addShoppingItem()}
              />
              <div className="flex justify-end items-center gap-x-2">
                <div className="font-bold text">￥</div>
                <div className="max-w-28">
                  <Input
                    className="text text-right"
                    placeholder="価格"
                    type="tel"
                    value={newShoppingItemPrice}
                    onChange={(e) => {
                      onItemPriceChange(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && addShoppingItem()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            {availableButton ? (
              <Button
                className="h-full"
                type="button"
                onClick={addShoppingItem}
              >
                追加する
              </Button>
            ) : (
              <Button className="h-full" type="button" disabled>
                追加する
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
