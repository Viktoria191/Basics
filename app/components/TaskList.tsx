import React, { useEffect, useState } from 'react';
import { useTasks, useTasksLoading } from '../store/tasks/selectors';
import { getTasksAction } from '../store/tasks/actions';
import { useAppDispatch } from '../store/hooks';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { TaskItem } from './TaskItem';
import { Task } from '../store/tasks/types';

const renderTasksItem = ({ item }: ListRenderItemInfo<Task>) => {
  return (
    <TaskItem
      id={item.id}
      title={item.title}
      description={item.description}
      completed={item.completed}
      importance={item.importance}
    />
  );
};

const keyExtractorTasks = (item: Task) => `${item.id}`;

type FilterType = 'all' | 'important';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useTasks();
  const loading = useTasksLoading();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(getTasksAction());
    } finally {
      setRefreshing(false);
    }
  };

  const filteredTasks =
    filter === 'important' ? tasks.filter(task => task.importance) : tasks;

  if (loading && !refreshing) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={
              filter === 'all' ? styles.activeFilterText : styles.filterText
            }
          >
            Все
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'important' && styles.activeFilter,
          ]}
          onPress={() => setFilter('important')}
        >
          <Text
            style={
              filter === 'important'
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Важные
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        key="tasks"
        data={filteredTasks}
        renderItem={renderTasksItem}
        keyExtractor={keyExtractorTasks}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Нет задач</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  filterText: {
    color: '#000',
  },
  activeFilterText: {
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export { TaskList };
