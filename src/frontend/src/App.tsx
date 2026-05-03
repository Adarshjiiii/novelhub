import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { useMyProfile } from "@/hooks/useApi";
import LoginPage from "@/pages/LoginPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LibraryPage = lazy(() => import("@/pages/LibraryPage"));
const FriendsPage = lazy(() => import("@/pages/FriendsPage"));
const NovelDetailPage = lazy(() => import("@/pages/NovelDetailPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ChapterPage = lazy(() => import("@/pages/ChapterPage"));
const AuthorDashboardPage = lazy(() => import("@/pages/AuthorDashboardPage"));
const NovelFormPage = lazy(() => import("@/pages/NovelFormPage"));
const ChapterFormPage = lazy(() => import("@/pages/ChapterFormPage"));
const CollaborativeEditorPage = lazy(
  () => import("@/pages/CollaborativeEditorPage"),
);

function PageLoader() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function AuthorRoute({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useMyProfile();
  if (isLoading) return <PageLoader />;
  if (!profile?.isAuthor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">Author access required.</p>
        <a href="/profile" className="text-primary underline text-sm">
          Go to Profile
        </a>
      </div>
    );
  }
  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <Outlet />
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    </Layout>
  ),
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <LibraryPage />
      </Suspense>
    </Layout>
  ),
});

const novelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/novel/$id",
  component: () => (
    <Layout withSidebar={false}>
      <Suspense fallback={<PageLoader />}>
        <NovelDetailPage />
      </Suspense>
    </Layout>
  ),
});

const friendsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/friends",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <FriendsPage />
      </Suspense>
    </Layout>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProfilePage />
      </Suspense>
    </Layout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const chapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chapter/$novelId/$chapterId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChapterPage />
    </Suspense>
  ),
});

const authorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author-dashboard",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AuthorDashboardPage />
      </Suspense>
    </Layout>
  ),
});

const newNovelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author/novel/new",
  component: () => (
    <Layout>
      <AuthorRoute>
        <Suspense fallback={<PageLoader />}>
          <NovelFormPage />
        </Suspense>
      </AuthorRoute>
    </Layout>
  ),
});

const editNovelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author/novel/$id/edit",
  component: () => (
    <Layout>
      <AuthorRoute>
        <Suspense fallback={<PageLoader />}>
          <NovelFormPage />
        </Suspense>
      </AuthorRoute>
    </Layout>
  ),
});

const newChapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author/novel/$id/chapter/new",
  component: () => (
    <Layout>
      <AuthorRoute>
        <Suspense fallback={<PageLoader />}>
          <ChapterFormPage />
        </Suspense>
      </AuthorRoute>
    </Layout>
  ),
});

const editChapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author/chapter/$novelId/$chapterId/edit",
  component: () => (
    <Layout>
      <AuthorRoute>
        <Suspense fallback={<PageLoader />}>
          <ChapterFormPage />
        </Suspense>
      </AuthorRoute>
    </Layout>
  ),
});

const collabEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/author/chapter/$novelId/$chapterId/collab",
  component: () => (
    <AuthorRoute>
      <Suspense fallback={<PageLoader />}>
        <CollaborativeEditorPage />
      </Suspense>
    </AuthorRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  libraryRoute,
  novelRoute,
  chapterRoute,
  friendsRoute,
  profileRoute,
  loginRoute,
  authorDashboardRoute,
  newNovelRoute,
  editNovelRoute,
  newChapterRoute,
  editChapterRoute,
  collabEditorRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
