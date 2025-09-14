<script setup lang="ts">
import { accountNavigation } from '~/const/headers';
</script>

<template>
	<nav class="account-navigation">
		<div class="nav-header">
			<div class="nav-logo">
				<v-icon
					size="24"
					class="logo-icon"
				>
					mdi-account-circle
				</v-icon>
				<h3 class="nav-title">
					Аккаунт
				</h3>
			</div>
		</div>

		<div class="nav-menu">
			<NuxtLink
				v-for="button in accountNavigation"
				:key="button.title"
				:to="button.to"
				class="nav-item"
				:class="{ active: $route.path === button.to }"
			>
				<div class="nav-item-content">
					<v-icon
						size="20"
						class="nav-icon"
					>
						{{ button.icon }}
					</v-icon>
					<span class="nav-text">{{ $t(button.title) }}</span>
				</div>
				<div class="nav-indicator" />
			</NuxtLink>
		</div>
	</nav>
</template>

<style scoped lang="scss">
.account-navigation {
  .nav-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo-icon {
        color: var(--primary-color);
        filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
      }

      .nav-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
      }
    }
  }

  .nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .nav-item {
      display: block;
      text-decoration: none;
      color: var(--text-secondary);
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &:hover {
        background: var(--surface-hover);
        color: var(--text-primary);
      }

      &.active {
        background: var(--surface-hover);
        color: var(--primary-color);
        border: 1px solid var(--border-hover);

        .nav-icon {
          color: var(--primary-color);
        }

        .nav-indicator {
          opacity: 1;
          transform: scaleY(1);
        }
      }

      .nav-item-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        position: relative;
        z-index: 2;

        .nav-icon {
          transition: all 0.3s ease;
        }

        .nav-text {
          font-weight: 500;
          font-size: 0.95rem;
        }
      }

      .nav-indicator {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0);
        width: 3px;
        height: 60%;
        background: var(--gradient-primary);
        border-radius: 0 2px 2px 0;
        opacity: 0;
        transition: all 0.3s ease;
      }
    }
  }
}

// Mobile responsive
@media screen and (max-width: 1024px) {
  .account-navigation {
    .nav-menu {
      flex-direction: row;
      overflow-x: auto;
      gap: 12px;
      padding-bottom: 10px;

      .nav-item {
        flex-shrink: 0;
        min-width: 120px;

        .nav-item-content {
          flex-direction: column;
          gap: 8px;
          padding: 16px 12px;
          text-align: center;

          .nav-text {
            font-size: 0.85rem;
          }
        }

        .nav-indicator {
          left: 50%;
          top: auto;
          bottom: 0;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 3px;
          border-radius: 2px 2px 0 0;
        }

        &.active .nav-indicator {
          transform: translateX(-50%) scaleX(1);
        }
      }
    }
  }
}
</style>
