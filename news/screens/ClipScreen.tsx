import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'

import { State } from '../types/state'
import { ListItem } from '../components/ListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1, //　余白全体を使う
    backgroundColor: '#eee',
  },
})

export const ClipScreen = ({ navigation }: any) => {
  const clips = useSelector((state: State) => {
    return state.user.clips
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clips}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  )
}
