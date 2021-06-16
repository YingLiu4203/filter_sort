import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import USERS from "../data/users";
import ListHeader from "./ListHeader";

function keyExtractor(_, index) {
  return index.toString();
}

function renderItem({ item }) {
  return <Text style={styles.item}>{`${item.name}: ${item.gpa}`}</Text>;
}

function filterSort(data, text, asc) {
  const newData = data.filter((user) => {
    if (text) {
      return user.name.includes(text);
    } else {
      return true;
    }
  });

  const sortFunction = asc
    ? (u1, u2) => u1.name.localeCompare(u2.name)
    : (u1, u2) => u2.name.localeCompare(u1.name);

  return newData.sort(sortFunction);
}

function UserList() {
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState(USERS);
  const [asc, setAsc] = useState(true);

  function onFilter(text) {
    setFilter(text);
    const newData = filterSort(USERS, text, asc);
    setData(newData);
  }

  function onSort() {
    const reverse = !asc;
    setAsc(reverse);

    const newData = filterSort(USERS, filter, reverse);
    setData(newData);
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader({ onFilter, onSort, asc })}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}

export default UserList;

const styles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 5,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
  },
});
