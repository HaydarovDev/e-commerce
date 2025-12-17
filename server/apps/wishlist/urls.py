from rest_framework.routers import DefaultRouter
from .views import WishlistItemViewSet

router = DefaultRouter()
router.register(r"items", WishlistItemViewSet, basename="wishlistitem")

urlpatterns = router.urls
