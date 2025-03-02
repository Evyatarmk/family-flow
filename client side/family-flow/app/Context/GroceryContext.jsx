import React, { createContext, useContext, useState } from "react";

const GroceryContext = createContext();
export const useGrocery = () => useContext(GroceryContext);
export const GroceryProvider = ({ children }) => {
  const [groceryData, setGroceryData] = useState([
    {
      id: 1,
      name: "רשימת מצרכים לפסח",
      items: [
        { id: 1, name: "מצה", quantity: 2, isTaken: false, description: "מצות שמורות ללא חשש קטניות" },
        { id: 2, name: "יין", quantity: 1, isTaken: false, description:""},
      ],
    },
    {
      id: 2,
      name: "רשימת מצרכים לשבוע",
      items: [
        { id: 3, name: "חלב", quantity: 1, isTaken: false, description: "חלב 3% טרי" },
        { id: 4, name: "לחם", quantity: 3, isTaken: false, description: "לחם אחיד פרוס" },
      ],
    },
  ]);
  

  // פונקציה לקבלת פריטים לפי listId
  const getItemsForList = (listId) => {
    const list = groceryData.find((list) => list.id === listId);
    return list ? list.items : [];
  };

  const addNewList= (listName) => {
    let newList={
      id: Date.now(),
      name: listName,
      items: [],
    }
    let newGroceryData=[...groceryData,newList]
    setGroceryData(newGroceryData)
  };
  const deleteList= (listId) => {
    let newGroceryData=groceryData.filter(list=>list.id!=listId)
    setGroceryData(newGroceryData)
  }; 
  const updateListName = (listId, newName) => {
    setGroceryData(prevData =>
      prevData.map(list => 
        list.id === listId ? { ...list, name: newName } : list
      )
    );
  };
  
  // פונקציה לעדכון פריט ברשימה
  const updateItemStatus = (listId, itemId) => {
    const updatedGroceryData = groceryData.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId
                ? { ...item, isTaken: !item.isTaken }
                : item
            ),
          }
        : list
    );
    setGroceryData(updatedGroceryData);
  };
  const updateItemField = (listId, updatedItem) => {
    setGroceryData((prevData) =>
      prevData.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === updatedItem.id
                  ? { ...item, ...updatedItem }
                  : item
              ),
            }
          : list
      )
    );
  };
  

  return (
    <GroceryContext.Provider value={{ groceryData, updateListName,setGroceryData,updateItemField,deleteList, getItemsForList, updateItemStatus,addNewList }}>
      {children}
    </GroceryContext.Provider>
  );
};
