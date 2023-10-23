import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { ListItem } from '../components/ListItem'

import { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { Text } from 'react-native'
import { WebView } from 'react-native-webview'

export const ArticleScreen = ({ route }: any) => {
  console.log(route.params)
  const { article } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <WebView style={styles.container} source={{ uri: article.url }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //　余白全体を使う
    backgroundColor: '#eee',
  },
})
