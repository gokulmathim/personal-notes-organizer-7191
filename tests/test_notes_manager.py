import pytest
from src.notes_manager import NotesManager

def test_add_note_success():
    manager = NotesManager()
    note = manager.add_note("Test", "Sample content")
    assert note["title"] == "Test"
    assert len(manager.get_all_notes()) == 1

def test_add_note_empty_title():
    manager = NotesManager()
    with pytest.raises(ValueError):
        manager.add_note("", "Some content")

def test_delete_note_by_title():
    manager = NotesManager()
    manager.add_note("Note1", "A")
    deleted = manager.delete_note_by_title("Note1")
    assert deleted
    assert len(manager.get_all_notes()) == 0
