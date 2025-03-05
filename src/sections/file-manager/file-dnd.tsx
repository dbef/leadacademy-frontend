import React, { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'; // Import from sortable
import { Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react'; // Correct Iconify import
import Image from 'next/image'; // Assuming you're using Next.js Image

interface FileDto {
  media_id: string;
  media_url: string;
  media_name: string;
  location: string;
  type: string;
  media_size: number;
  created_at: string;
  updated_at: string;
  folder_id?: string;
  folder?: any; // Adjust as per your schema
}

interface FileManagerProps {
  selectedFiles: FileDto[];
  setSelectedFiles: (files: FileDto[]) => void;
  handleRemoveImage: (image: FileDto) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ selectedFiles, setSelectedFiles, handleRemoveImage }) => {
  // Handle the drag end event to reorder the list
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // If no valid drop target, do nothing

    // Reorder the list based on the drag result
    const oldIndex = selectedFiles.findIndex((file) => file.media_id === active.id);
    const newIndex = selectedFiles.findIndex((file) => file.media_id === over.id);

    if (oldIndex !== newIndex) {
      const updatedFiles = [...selectedFiles];
      const [removed] = updatedFiles.splice(oldIndex, 1);
      updatedFiles.splice(newIndex, 0, removed);
      setSelectedFiles(updatedFiles);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={selectedFiles.map((file) => file.media_id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {selectedFiles.map((image) => (
            <SortableImage
              key={image.media_id}
              image={image}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

interface SortableImageProps {
  image: FileDto;
  handleRemoveImage: (image: FileDto) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({ image, handleRemoveImage }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: image.media_id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <Image
        src={image.media_url}
        alt={image.media_name}
        height={100}
        width={120}
        style={{ objectFit: 'cover', borderRadius: 2 }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
        onClick={() => handleRemoveImage(image)}
      >
        <Icon icon="eva:close-fill" width={16} />
      </IconButton>
    </Box>
  );
};

export default FileManager;
