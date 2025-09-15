<script setup lang="ts">
interface Achievement {
	id: string;
	name: string;
	description: string;
	requirement: number;
	reward: string;
	icon: string;
}

interface Props {
	achievements: Achievement[];
	achievementList: Achievement[];
}

defineProps<Props>();
</script>

<template>
	<v-card class="achievements-card">
		<v-card-title class="achievements-title">
			<v-icon>mdi-trophy</v-icon>
			Достижения ({{ achievements?.length || 0 }}/{{ achievementList?.length || 0 }})
		</v-card-title>
		<v-card-text class="achievements-content">
			<div class="achievements-grid">
				<div
					v-for="achievement in (achievementList || [])"
					:key="achievement.id"
					class="achievement-item"
					:class="{ unlocked: achievements?.find(a => a.id === achievement.id) }"
				>
					<v-icon
						:color="achievements?.find(a => a.id === achievement.id) ? 'warning' : 'grey'"
						size="24"
					>
						{{ achievement.icon }}
					</v-icon>
					<div class="achievement-info">
						<div class="achievement-name">
							{{ achievement.name }}
						</div>
						<div class="achievement-desc">
							{{ achievement.description }}
						</div>
					</div>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped lang="scss">
.achievements-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  .achievements-title {
    color: var(--text-primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .achievements-content {
    .achievements-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .achievement-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        background: var(--surface-hover);
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;

        &.unlocked {
          background: rgba(255, 193, 7, 0.1);
          border-color: #ffc107;
        }

        .achievement-info {
          flex: 1;

          .achievement-name {
            color: var(--text-primary);
            font-weight: 600;
            font-size: 0.9rem;
          }

          .achievement-desc {
            color: var(--text-secondary);
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}
</style>
