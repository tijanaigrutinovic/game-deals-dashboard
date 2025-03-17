# Generated by Django 5.1.4 on 2025-03-12 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('store_id', models.CharField(max_length=255)),
                ('store_name', models.CharField(max_length=255)),
                ('original_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('sale_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('deal_rating', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('is_on_sale', models.BooleanField(default=False)),
                ('deal_id', models.CharField(blank=True, max_length=255, null=True)),
                ('thumb_url', models.URLField()),
            ],
        ),
    ]
