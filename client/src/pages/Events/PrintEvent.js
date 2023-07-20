import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2, // Updated value
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginBottom: 8,
  },
  entryText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  columnHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2, // Updated value
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginBottom: 8,
  },
  columnHeadingText: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#121212",
  },
});
export const PrintEvent = ({ selectedEntries, selectedEvent }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{selectedEvent}</Text>

        <View style={styles.columnHeading}>
          <Text style={styles.columnHeadingText}>Person Name</Text>
          <Text style={styles.columnHeadingText}>City</Text>
          <Text style={styles.columnHeadingText}>Amount</Text>
          <Text style={styles.columnHeadingText}>Gift</Text>
        </View>

        {selectedEntries.map((singleEntry, i) => (
          <View key={`${singleEntry.entryId}-${i}`} style={styles.entry}>
            <Text style={styles.entryText}>{singleEntry.personName}</Text>
            <Text style={styles.entryText}>{singleEntry.city}</Text>
            <Text style={styles.entryText}>₹{singleEntry.amount}</Text>
            <Text style={styles.entryText}>{singleEntry.gift}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
