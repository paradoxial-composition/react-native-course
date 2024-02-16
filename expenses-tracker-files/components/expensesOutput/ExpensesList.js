import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
