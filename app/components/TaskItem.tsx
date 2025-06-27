import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import {
  toggleTaskAction,
  updateTaskAction,
  deleteTaskAction,
} from '../store/tasks/actions';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';

type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  importance: boolean;
  completed: boolean;
};

const TaskItem = ({
  id,
  title,
  description,
  importance,
  completed,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImportance, setEditImportance] = useState(importance);

  const handleToggle = () => {
    dispatch(toggleTaskAction(id));
  };

  const handleDelete = () => {
    Alert.alert(
      'Удаление задачи',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => dispatch(deleteTaskAction(id)),
        },
      ],
    );
  };

  const handleSave = () => {
    if (editTitle.trim() && editDescription.trim()) {
      dispatch(
        updateTaskAction({
          id,
          title: editTitle,
          description: editDescription,
          importance: editImportance,
          completed,
        }),
      );
      setIsEditModalVisible(false);
    }
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={handleToggle} style={styles.taskInfo}>
          <View style={styles.checkbox}>
            {completed ? <View style={styles.checkboxChecked} /> : null}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, completed && styles.completedText]}>
              {title}
            </Text>
            <Text style={styles.description}>{description}</Text>
            {importance && (
              <View style={styles.importanceBadge}>
                <Text style={styles.importanceText}>Важно</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => setIsEditModalVisible(true)}
            style={styles.actionButton}
          >
            <EditIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Редактировать задачу</Text>

            <Text style={styles.label}>Название задачи*</Text>
            <TextInput
              placeholder="Введите название"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />

            <Text style={styles.label}>Описание*</Text>
            <TextInput
              placeholder="Введите описание"
              value={editDescription}
              onChangeText={setEditDescription}
              style={[styles.input, styles.descriptionInput]}
              multiline
              numberOfLines={4}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Важная задача</Text>
              <Switch
                value={editImportance}
                onValueChange={setEditImportance}
                trackColor={{ false: '#e0e0e0', true: '#81c784' }}
                thumbColor={editImportance ? '#4caf50' : '#f5f5f5'}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={!editTitle.trim() || !editDescription.trim()}
                style={[styles.modalButton, styles.saveButton]}
              >
                <Text style={styles.modalButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#6200ee',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  importanceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffeb3b',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  importanceText: {
    fontSize: 12,
    color: '#ff6f00',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#555',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export { TaskItem };
