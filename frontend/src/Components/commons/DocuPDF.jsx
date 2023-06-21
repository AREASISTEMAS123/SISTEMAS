import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

export const DocuPDF = ({ poema }) => {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  return (
    <Document>
      <Page size="A4" className="flex flex-col justify-center items-center bg-white">
        <View className="flex flex-col justify-center items-center bg-white p-10">
          <Text className="text-blue-500 text-4xl">
            {poema ? poema.title : "..."}
          </Text>
          <Text>Por {poema ? poema.poet.name : "..."}</Text>
          <Image
            src="https://picsum.photos/600/400"
            alt="random image"
            className="max-w-600 max-h-400"
          />
          <Text className="text-gray-500 italic text-xs">{lorem}</Text>

          <Text className="text-justify mt-5">
            {poema ? poema.content : null}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
