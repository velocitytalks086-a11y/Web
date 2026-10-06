INSERT INTO "products" ("id", "name", "category", "description", "access", "button", "glyph", "sort_order") VALUES
('sample1', 'Vantage Dispatch', 'Roleplay Systems', 'A modern dispatch experience designed for organized roleplay operations and clear communication.', 'request', 'Request access', '⌁', 1),
('sample2', 'Vantage Operations', 'Roleplay Systems', 'Bring team workflows, procedures and day-to-day operations into one streamlined experience.', 'request', 'Request access', '✳', 2),
('sample3', 'Vantage Creator', 'Creator Tools', 'A toolkit concept for creators who want to plan, organize and present their digital projects.', 'request', 'Request access', '↗', 3)
ON CONFLICT ("id") DO NOTHING;
