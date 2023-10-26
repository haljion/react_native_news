import { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import axios from 'axios'

import { Article } from '../types/article'
import { ListItem } from '../components/ListItem'

// Constants.manifest は現行バージョンで非推奨。Constants.expoConfig? を使用する
const URL = `https://newsapi.org/v2/everything?q=tesla&from=2023-09-26&sortBy=publishedAt&apiKey=${Constants?.expoConfig?.extra?.newsApiKey}`

const styles = StyleSheet.create({
  container: {
    flex: 1, //　余白全体を使う
    backgroundColor: '#eee',
  },
})

export const HomeScreen = ({ navigation }: any) => {
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL)
      console.log('fetchArticles success.')
      setArticles(response.data.articles)
    } catch (error) {
      console.error(error)
    }
  }

  // 初期表示処理
  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => {
              navigation.navigate('Article', { article: item })
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  )
}
