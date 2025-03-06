
import { useState } from 'react';
import { motion } from 'framer-motion';
import newsData from '../data/newsData.json';
import TopicGrid from './TopicGrid';
import SubtopicList from './SubtopicList';
import NewsList from './NewsList';
import TagFilter from './TagFilter';
import { ChevronRight } from 'lucide-react';

export type Topic = (typeof newsData.topics)[0];
export type Subtopic = Topic['subtopics'][0];
export type Story = Subtopic['stories'][0];

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(
      newsData.topics
        .flatMap(topic => topic.subtopics)
        .flatMap(subtopic => subtopic?.stories || [])
        .flatMap(story => story?.tags || [])
    )
  );

  const handleBack = () => {
    if (selectedSubtopic) {
      setSelectedSubtopic(null);
    } else if (selectedTopic) {
      setSelectedTopic(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <button
            onClick={handleBack}
            className={`hover:text-gray-900 transition-colors ${
              !selectedTopic && !selectedSubtopic ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          {selectedTopic && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span>{selectedTopic.title}</span>
            </>
          )}
          {selectedSubtopic && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span>{selectedSubtopic.title}</span>
            </>
          )}
        </nav>

        {/* Tag Filter */}
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
        />

        {/* Content */}
        <motion.div
          layout
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!selectedTopic && (
            <TopicGrid topics={newsData.topics} onTopicSelect={setSelectedTopic} />
          )}
          {selectedTopic && !selectedSubtopic && (
            <SubtopicList
              topic={selectedTopic}
              onSubtopicSelect={setSelectedSubtopic}
            />
          )}
          {selectedTopic && selectedSubtopic && (
            <NewsList
              stories={selectedSubtopic.stories.filter(
                story =>
                  selectedTags.length === 0 ||
                  story.tags.some(tag => selectedTags.includes(tag))
              )}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
