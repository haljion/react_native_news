import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { ListItem } from '../components/ListItem'

import { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import axios from 'axios'

type Aritcle = { author: string; title: string; urlToImage: string; publishedAt: string }

// Constants.manifest は現行バージョンで非推奨。Constants.expoConfig? を使用する
const URL = `https://newsapi.org/v2/everything?q=tesla&from=2023-09-23&sortBy=publishedAt&apiKey=${Constants.expoConfig?.extra.newsApiKey}`

export const HomeScreen = ({ navigation }: any) => {
  const [articles, setArticles] = useState<Aritcle[]>([])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL)
      console.log(response.data.articles)
      setArticles(response.data.articles)
    } catch (error) {
      console.error(error)
    }
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1, //　余白全体を使う
    backgroundColor: '#eee',
  },
})
