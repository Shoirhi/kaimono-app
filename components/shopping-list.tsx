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

      focusToNameInput();
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

  function onChangePrice(value: string) {
    if (value === "" || isNumeric(value)) {
      setNewShoppingItemPrice(Number(value));
    }
  }

  function resetShoppingItems() {
    setShoppingItemsAdvance([]);
    setShowResetDialog(false);
  }

  function triggerActivation(index: number) {
    const currentShoppingItems = shoppingItems;

    currentShoppingItems[index].active = currentShoppingItems[index].active
      ? false
      : true;

    setShoppingItemsAdvance(currentShoppingItems);
    setTotalPrice(calculateTotalPrice(shoppingItems));
  }

  return (
    <>
      <Drawer>
        <div className="container py-3 border-b sticky top-0 bg-neutral-50 shadow">
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowResetDialog(true)}
                  >
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
        <div className="container py-4">
          {shoppingItems.length ? (
            <Table>
              <TableBody>
                {shoppingItems.map((item, index) => (
                  <TableRow key={index} className={clsx(!item.active && "opacity-30")}>
                    <TableCell className="p-2">{item.name}</TableCell>
                    <TableCell className="p-2">
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
          <div className="flex justify-center">
            <DrawerTrigger asChild>
              <Button variant="outline" onClick={focusToNameInput} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>商品を入力</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <Input
                    className="text-xl"
                    placeholder="パン"
                    type="text"
                    ref={nameInputRef}
                    value={newShoppingItemName}
                    onChange={(e) => setNewShoppingItemName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addShoppingItem()}
                  />
                  <div className="flex justify-end items-center gap-x-2">
                    <div className="font-bold text-2xl">￥</div>
                    <div className="max-w-28">
                      <Input
                        className="text-2xl text-right"
                        placeholder="298"
                        type="tel"
                        value={newShoppingItemPrice}
                        onChange={(e) => onChangePrice(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && addShoppingItem()
                        }
                      />
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button type="button" onClick={addShoppingItem}>
                    追加する
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </div>
        </div>
      </Drawer>
    </>
  );
}
