package com.finances.backup;

import java.util.List;

public interface Backup<T> {
    List<T> getBackup();
}