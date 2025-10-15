import os
import json
from src.file_handler import FileHandler

def test_save_and_load_notes(tmp_path):
    file_path = tmp_path / "notes.json"
    handler = FileHandler(file_path)
    notes = [{"title": "Note1", "content": "Sample"}]
    handler.save_notes(notes)

    loaded = handler.load_notes()
    assert loaded == notes

def test_load_non_existent_file(tmp_path):
    file_path = tmp_path / "missing.json"
    handler = FileHandler(file_path)
    notes = handler.load_notes()
    assert notes == []
