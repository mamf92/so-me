import { renderPostCardWithEditActions } from '../components/ui/PostCardWithEditActions.ts';
import { renderLoginForm } from '../components/forms/LoginForm.ts';
import { renderRegistrationForm } from '../components/forms/RegistrationForm.ts';
import { renderPostCreationForm } from '../components/forms/CreatePostForm.ts';
import { renderMyPostsSection } from '../components/sections/MyPostsSection.ts';
import { renderFeedSection } from '../components/sections/FeedSection.ts';

const fictivePost = {
  id: 8933,
  title: 'Strawberry coctail drinks',
  body: 'Today I made a strawberry cocktail drink with fresh strawberries, ice, and a splash of lemon juice. It was refreshing and perfect for a summer day! The receipe is simple: blend 1 cup of fresh strawberries, 1/2 cup of ice, 1 tablespoon of lemon juice, and 1 teaspoon of honey. Enjoy!',
  tags: ['drinks', 'summer', 'strawberry'],
  media: {
    url: 'https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Image of a strawberry cocktail',
  },
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  author: {
    name: 'Jane Doe',
  },
  _count: { comments: 1, reactions: 17 },
};

const fictivePosts = [fictivePost, fictivePost, fictivePost, fictivePost];

export function renderTestPage() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  const cardHtml = renderPostCardWithEditActions(fictivePost);
  container.insertAdjacentHTML('beforeend', cardHtml);

  container.appendChild(renderLoginForm());

  container.appendChild(renderRegistrationForm());

  container.appendChild(renderPostCreationForm());

  container.appendChild(renderMyPostsSection(fictivePosts));

  container.appendChild(renderFeedSection(fictivePosts));
  return container;
}
